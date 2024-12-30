#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color
BLUE='\033[0;34m'

# Base directory
BASE_DIR="/home/bish/Downloads/sites"
CONFIG_DIR="/home/bish/Downloads/config"
BACKUP_DIR="/home/bish/Downloads/backups/$(date +%Y%m%d_%H%M%S)"

# Project mappings with correct ports
declare -A PROJECT_PORTS=(
    ["vcc-platform"]=3000
    ["crm"]=3100
    ["www"]=3200
    ["raffle"]=3300
    ["skyhigh-platform"]=3400
    ["skyhigh-backend"]=3410
    ["spraiybooth"]=3500
    ["rockregister"]=3600
    ["tradertokenbot"]=3700
    ["kuma"]=3800
)

declare -A PROJECT_PATHS=(
    ["vcc-platform"]="$BASE_DIR/vcc-platform"
    ["crm"]="$BASE_DIR/crm-platform"
    ["www"]="$BASE_DIR/myinvoices-www"
    ["raffle"]="$BASE_DIR/raffle-platform"
    ["skyhigh-platform"]="$BASE_DIR/skyhigh-platform/skyhighdeploy"
    ["skyhigh-backend"]="$BASE_DIR/skyhigh-platform/backend"
    ["spraiybooth"]="$BASE_DIR/spraiybooth"
    ["rockregister"]="$BASE_DIR/rockregister-platform"
    ["tradertokenbot"]="$BASE_DIR/tradertokenbot-platform"
    ["kuma"]="$BASE_DIR/Kuma"
)

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

# Function to backup current state
backup_current_state() {
    print_color $BLUE "Creating backup of current state..."
    mkdir -p "$BACKUP_DIR"
    
    # Backup PM2 list
    pm2 list > "$BACKUP_DIR/pm2_list.txt"
    
    # Backup running processes
    ps aux > "$BACKUP_DIR/processes.txt"
    
    # Backup port usage
    netstat -tulpn > "$BACKUP_DIR/ports.txt"
    
    log_message "Backup created at $BACKUP_DIR"
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

# Function to check health of service
check_health() {
    local service=$1
    local port=$2
    local max_retries=5
    local retry_count=0
    local wait_time=5

    print_color $YELLOW "Checking health of $service on port $port..."
    
    while [ $retry_count -lt $max_retries ]; do
        if curl -s "http://localhost:$port/health" >/dev/null || curl -s "http://localhost:$port" >/dev/null; then
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

# Function to kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        log_message "Killing process on port $port (PID: $pid)"
        kill -9 $pid 2>/dev/null
    fi
}

# Function to rebuild and restart project
rebuild_project() {
    local project_name=$1
    local project_path=${PROJECT_PATHS[$project_name]}
    local port=${PROJECT_PORTS[$project_name]}
    
    # Use PORT env variable if set, otherwise use the default port
    if [ -n "$PORT" ]; then
        port=$PORT
    fi
    
    print_color $BLUE "\nProcessing $project_name (Port: $port)"
    log_message "Starting deployment of $project_name"
    
    # Check if project path exists
    if [ ! -d "$project_path" ]; then
        print_color $RED "Project path not found: $project_path"
        log_message "ERROR: Project path not found: $project_path"
        return 1
    fi

    # Create backup of project dist
    if [ -d "$project_path/dist" ]; then
        mkdir -p "$BACKUP_DIR/$project_name"
        cp -r "$project_path/dist" "$BACKUP_DIR/$project_name/"
        log_message "Created backup of $project_name dist directory"
    fi

    # Kill the port if it's in use
    kill_port $port

    # Build the project
    print_color $YELLOW "Building $project_name..."
    cd $project_path
    
    # Backup package.json and node_modules
    cp package.json "$BACKUP_DIR/$project_name/" 2>/dev/null
    
    if ! ./deploy.sh; then
        print_color $RED "Build failed for $project_name"
        log_message "ERROR: Build failed for $project_name"
        
        # Attempt rollback
        print_color $YELLOW "Attempting rollback..."
        if [ -d "$BACKUP_DIR/$project_name/dist" ]; then
            rm -rf dist
            cp -r "$BACKUP_DIR/$project_name/dist" .
            pm2 restart $project_name
            log_message "Rolled back $project_name to previous version"
        fi
        
        return 1
    fi

    # Copy public assets if they exist
    if [ -d "public" ]; then
        cp -r public/* dist/ 2>/dev/null
    fi

    # Start with PM2 using global config
    print_color $YELLOW "Starting $project_name with PM2..."
    pm2 start $CONFIG_DIR/ecosystem.global.config.js --only $project_name --no-cluster
    
    # Wait for service to be available
    if ! wait_for_port $port $project_name; then
        print_color $RED "Service $project_name failed to start"
        restore_service $project_name $project_path
        return 1
    fi
    
    # Check health
    if ! check_health $project_name $port; then
        print_color $RED "Health check failed for $project_name"
        log_message "ERROR: Health check failed for $project_name"
        
        # Attempt rollback
        print_color $YELLOW "Attempting rollback..."
        if [ -d "$BACKUP_DIR/$project_name/dist" ]; then
            rm -rf dist
            cp -r "$BACKUP_DIR/$project_name/dist" .
            pm2 restart $project_name
            log_message "Rolled back $project_name to previous version"
        fi
        
        return 1
    fi
    
    log_message "Successfully deployed $project_name"
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

# Main script
clear
echo "Current PM2 processes:"
pm2 list

# Create backup of current state
backup_current_state

echo -e "\nAvailable projects:"
for project in "${!PROJECT_PORTS[@]}"; do
    echo "- $project (Port: ${PROJECT_PORTS[$project]})"
done

# Get project names from arguments
if [ $# -eq 0 ]; then
    echo -e "\nEnter project names to rebuild (comma-separated) or 'all' for all projects:"
    read input
    if [ -z "$input" ]; then
        print_color $YELLOW "No projects selected. Exiting..."
        exit 0
    fi
    if [ "$input" == "all" ]; then
        projects=("${!PROJECT_PORTS[@]}")
    else
        IFS=',' read -ra projects <<< "$input"
    fi
else
    projects=("$@")
fi

# Process each project
for project in "${projects[@]}"; do
    project=$(echo $project | tr -d ' ') # Remove any whitespace
    
    if [ -z "${PROJECT_PATHS[$project]}" ]; then
        print_color $RED "Unknown project: $project"
        log_message "ERROR: Unknown project: $project"
        continue
    fi
    
    rebuild_project $project
done

# Show deployment summary
show_deployment_summary

print_color $GREEN "\nDeployment process completed!"
log_message "Deployment process completed"
