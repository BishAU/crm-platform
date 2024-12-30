#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'
BLUE='\033[0;34m'

# Base directories
BASE_DIR="/home/bish/Downloads/sites"
CONFIG_DIR="/home/bish/Downloads/config"
BACKUP_DIR="/home/bish/Downloads/backups/$(date +%Y%m%d_%H%M%S)"
LOG_DIR="/home/bish/Downloads/logs"

# Create necessary directories
mkdir -p "$BACKUP_DIR" "$LOG_DIR"

# Function to print in color
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to log messages
log_message() {
    local message=$1
    local log_file="$BACKUP_DIR/deployment.log"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $message" | tee -a "$log_file"
}

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to wait for port to be available
wait_for_port() {
    local port=$1
    local service=$2
    local max_attempts=30
    local attempt=1

    print_color $YELLOW "Waiting for $service to be available on port $port..."
    
    while [ $attempt -le $max_attempts ]; do
        if check_port $port; then
            print_color $GREEN "$service is available on port $port"
            return 0
        fi
        print_color $YELLOW "Attempt $attempt/$max_attempts - waiting 2s..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_color $RED "$service failed to start on port $port after $max_attempts attempts"
    return 1
}

# Function to check service health
check_health() {
    local service=$1
    local port=$2
    local health_endpoint=${3:-"/api/health"}
    local max_retries=5
    local retry_count=0
    local wait_time=5

    print_color $YELLOW "Checking health of $service on port $port..."
    
    while [ $retry_count -lt $max_retries ]; do
        local response=$(curl -s "http://localhost:$port$health_endpoint")
        if [ $? -eq 0 ] && [ ! -z "$response" ]; then
            print_color $GREEN "$service is healthy"
            return 0
        fi
        
        retry_count=$((retry_count + 1))
        print_color $YELLOW "Attempt $retry_count/$max_retries - Waiting ${wait_time}s before retry..."
        sleep $wait_time
    done
    
    print_color $RED "$service health check failed after $max_retries attempts"
    return 1
}

# Function to backup current state
backup_service() {
    local service=$1
    local service_dir=$2
    
    print_color $BLUE "Creating backup of $service..."
    
    # Create service backup directory
    local backup_path="$BACKUP_DIR/$service"
    mkdir -p "$backup_path"
    
    # Backup dist directory if it exists
    if [ -d "$service_dir/dist" ]; then
        cp -r "$service_dir/dist" "$backup_path/"
    fi
    
    # Backup package.json and .env
    cp "$service_dir/package.json" "$backup_path/" 2>/dev/null
    cp "$service_dir/.env" "$backup_path/" 2>/dev/null
    
    # Backup PM2 process list
    pm2 prettylist > "$backup_path/pm2_state.json"
    
    log_message "Created backup of $service at $backup_path"
}

# Function to restore service from backup
restore_service() {
    local service=$1
    local service_dir=$2
    
    print_color $YELLOW "Restoring $service from backup..."
    
    local backup_path="$BACKUP_DIR/$service"
    if [ -d "$backup_path/dist" ]; then
        rm -rf "$service_dir/dist"
        cp -r "$backup_path/dist" "$service_dir/"
        log_message "Restored $service dist directory from backup"
        return 0
    else
        log_message "No backup found for $service"
        return 1
    fi
}

# Function to copy environment file
copy_env_file() {
    local service=$1
    local service_dir=$2
    
    print_color $YELLOW "Setting up environment for $service..."
    
    # Check if service has an environment file in config
    local env_file="$CONFIG_DIR/env/${service}.env"
    if [ -f "$env_file" ]; then
        print_color $BLUE "Found environment file for $service"
        cp "$env_file" "$service_dir/.env"
        
        # For services with server directory, also copy there
        if [ -d "$service_dir/server" ]; then
            cp "$env_file" "$service_dir/server/.env"
        fi
        
        log_message "Copied environment file for $service"
        return 0
    else
        print_color $YELLOW "No environment file found for $service at $env_file"
        return 1
    fi
}

# Function to build and deploy a service
deploy_service() {
    local service=$1
    local port=$2
    # Map service names to directories
    local service_to_dir=(
        ["www"]="myinvoices-www"
        ["crm"]="crm-platform"
        ["raffle"]="raffle-platform"
        ["rockregister"]="rockregister-platform"
    )
    
    # Get the directory name for the service
    local dir_name="${service_to_dir[$service]:-$service}"
    local service_dir="$BASE_DIR/$dir_name"
    
    print_color $BLUE "\nDeploying $service (Port: $port)"
    log_message "Starting deployment of $service"
    
    # Check if service directory exists
    if [ ! -d "$service_dir" ]; then
        print_color $RED "Service directory not found: $service_dir"
        return 1
    fi
    
    # Copy environment file before starting service
    copy_env_file "$service" "$service_dir"
    
    # Check for port conflicts
    if check_port $port; then
        print_color $YELLOW "Port $port is in use, checking for conflicts..."
        local conflicting_pid=$(lsof -t -i:$port)
        if [ ! -z "$conflicting_pid" ]; then
            local conflicting_service=$(pm2 jlist | jq -r ".[] | select(.pm2_env.status == \"online\") | select(.pid == $conflicting_pid) | .name")
            if [ ! -z "$conflicting_service" ]; then
                print_color $YELLOW "Found conflicting service: $conflicting_service. Stopping it..."
                pm2 stop $conflicting_service
                log_message "Stopped conflicting service $conflicting_service on port $port"
            else
                print_color $YELLOW "No PM2 service found on port $port, cleaning up port..."
                kill $conflicting_pid 2>/dev/null
            fi
        fi
    fi
    
    # Clean up existing service instance
    print_color $YELLOW "Cleaning up existing service instance..."
    pm2 delete $service 2>/dev/null
    
    # Save PM2 state after cleanup
    pm2 save --force
    
    # Build the service
    print_color $YELLOW "Building $service..."
    cd $service_dir
    
    # Run build based on project type
    if [ -f "package.json" ]; then
        if grep -q '"build:all"' package.json; then
            npm run build:all
        elif grep -q '"build"' package.json; then
            npm run build
        fi
    fi
    
    if [ $? -ne 0 ]; then
        print_color $RED "Build failed for $service"
        return 1
    fi
    
    # Start with PM2
    print_color $YELLOW "Starting $service with PM2..."
    cd /home/bish/Downloads
    pm2 start $CONFIG_DIR/ecosystem.global.config.js --only $service
    
    # Wait for service to be available
    if ! wait_for_port $port $service; then
        print_color $RED "Service $service failed to start"
        return 1
    fi
    
    # Check health
    if ! check_health $service $port; then
        print_color $RED "Health check failed for $service"
        return 1
    fi
    
    print_color $GREEN "Successfully deployed $service"
    log_message "Successfully deployed $service"
    return 0
}

# Function to display deployment summary
show_deployment_summary() {
    local log_file="$BACKUP_DIR/deployment.log"
    
    print_color $BLUE "\nDeployment Summary:"
    echo "----------------------------------------"
    echo "Successful deployments:"
    grep "Successfully deployed" "$log_file" | cut -d' ' -f4-
    echo "----------------------------------------"
    echo "Failed deployments:"
    grep "ERROR:" "$log_file" | cut -d' ' -f4-
    echo "----------------------------------------"
    echo "Full deployment log: $log_file"
}

# Main deployment process
main() {
    # No global cleanup needed when deploying specific services
    :
    
    # Define services and their ports
    declare -A services=(
        ["vcc-platform"]=3000
        ["crm"]=3100
        ["www"]=3200
        ["raffle"]=3300
        ["skyhigh-platform"]=3400
        ["spraiybooth"]=3500
        ["rockregister"]=3600
        ["tradertokenbot"]=3700
        ["kuma"]=3800
        ["abs-api"]=3002
    )
    
    # Check if a service argument is provided
    if [ -z "$1" ]; then
        # Deploy each service
        for service in "${!services[@]}"; do
           if [ "$service" = "abs-api" ]; then
                deploy_service "$service" 3002 "/home/bish/Downloads/sites/vcc-platform/public/ABS_API/js_abs_api"
            else
                deploy_service "$service" "${services[$service]}"
            fi
        done
    else
        # Deploy only the specified service
        local service="$1"
        if [[ "${services[$service]}" ]]; then
           if [ "$service" = "abs-api" ]; then
                deploy_service "$service" 3002 "/home/bish/Downloads/sites/vcc-platform/public/ABS_API/js_abs_api"
            else
                deploy_service "$service" "${services[$service]}"
            fi
        else
            print_color $RED "Service not found: $service"
            return 1
        fi
    fi
    
    # Show deployment summary
    show_deployment_summary
}

# Run main function
main "$1"
