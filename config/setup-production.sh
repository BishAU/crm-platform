#!/bin/bash

# Function to check disk space
check_disk_space() {
    local dir=$1
    local threshold=80
    local usage=$(df -h "$dir" | awk 'NR==2 {print $5}' | sed 's/%//')
    echo "Disk usage at ${usage}% (threshold: ${threshold}%)"
    if [ "$usage" -gt "$threshold" ]; then
        echo "Warning: Disk usage is above ${threshold}%"
        return 1
    fi
    return 0
}

# Function to setup log rotation
setup_log_rotation() {
    mkdir -p /home/bish/Downloads/config/logs
    if [ ! -f /etc/logrotate.d/setup-production ]; then
        sudo tee /etc/logrotate.d/setup-production > /dev/null << EOL
/home/bish/Downloads/config/logs/*.log {
    size 100M
    rotate 5
    compress
    delaycompress
    notifempty
    create 644 root root
}
EOL
    fi
}

# Function to clean up port
cleanup_port() {
    local port=$1
    local project=$2
    local pid=$(lsof -t -i:"$1")
    if [ ! -z "$pid" ]; then
        echo "Found process $pid using port $port, killing it..."
        kill -9 $pid
    else
        echo "No process found using port $port."
    fi
}

# Main script
echo "Starting production setup..."

# Check disk space
check_disk_space "/home/bish/Downloads/config/logs"

# Setup log rotation
echo "Setting up log rotation..."
setup_log_rotation

# Handle single project deployment
if [ ! -z "$1" ]; then
    project=$1
    echo "Setting up single project: $project"

    # Generate PM2 ecosystem config
    echo "Generating PM2 ecosystem config..."

    # Stop existing process and clean port
    echo "Stopping existing process for $project..."
    pm2 delete $project > /dev/null 2>&1 || true

    # Determine the correct port based on the project and set environment variables
    case "$project" in
        "vcc-platform")
            export PORT_VCC=3000
            port=3000
            ;;
        "crm-platform")
            export PORT_CRM=3100
            port=3100
            ;;
        "www-platform")
            export PORT_WWW=3200
            port=3200
            ;;
        "raffle-platform")
            export PORT_RAFFLE=3300
            port=3300
            ;;
        "skyhigh-platform")
            export PORT_SKYHIGH_FRONTEND=3400
            export PORT_SKYHIGH_BACKEND=3401
            port=3400
            ;;
        "spraiybooth")
            export PORT_SPRAYBOOTH=3500
            port=3500
            ;;
        "rockregister")
            export PORT_ROCKREGISTER=3600
            port=3600
            ;;
        "tradertokenbot")
            export PORT_TRADERTOKENBOT=3700
            port=3700
            ;;
        "kuma-platform")
            export PORT_KUMA=3800
            port=3800
            ;;
        *)
            echo "Unknown project: $project"
            exit 1
            ;;
    esac

    echo "Cleaning up port $port..."
    cleanup_port $port

    echo "Starting PM2 processes..."
    echo "Building project: $project"

    # Install dependencies
    echo "Executing: cd /home/bish/Downloads/sites/$project && npm install"
    echo "Purpose: Install dependencies"
    cd "/home/bish/Downloads/sites/$project" && npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies"
        exit 1
    fi
    echo "Command executed successfully"

    # Build project
    echo "Executing: cd /home/bish/Downloads/sites/$project && npm run build"
    echo "Purpose: Build project"
    cd "/home/bish/Downloads/sites/$project" && npm run build
    if [ $? -ne 0 ]; then
        echo "Failed to build project"
        exit 1
    fi
    echo "Command executed successfully"

    # Start PM2 process
    echo "Executing: cd /home/bish/Downloads/config && pm2 start ecosystem.config.js --only $project"
    echo "Purpose: Start $project process"
    cd /home/bish/Downloads/config && pm2 start ecosystem.config.js --only $project
    if [ $? -ne 0 ]; then
        echo "Failed to start PM2 process"
        exit 1
    fi
    echo "Command executed successfully"

    echo "All PM2 processes started"
    echo "Production setup completed successfully"

    # Save PM2 process list
    echo "Executing: pm2 save"
    echo "Purpose: Save PM2 process list"
    pm2 save
    if [ $? -ne 0 ]; then
        echo "Failed to save PM2 process list"
        exit 1
    fi
    echo "Command executed successfully"

    echo "Currently running processes:"
    pm2 list

    echo "Service available at: http://localhost:$port"
else
    echo "No project specified"
    exit 1
fi
