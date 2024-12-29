#!/bin/bash

# Exit on any error
set -e

# Function to log messages with timestamps
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -i :$port > /dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

# Function to verify service is running
verify_service() {
    local port=$1
    local max_attempts=5
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -I "http://localhost:$port" > /dev/null 2>&1; then
            return 0
        fi
        log "Attempt $attempt: Service not responding yet, waiting..."
        sleep 5
        attempt=$((attempt + 1))
    done
    return 1
}

# Default to production if no environment specified
ENVIRONMENT=${1:-production}
ECOSYSTEM_FILE=""
SERVICE_PORT=""
PM2_NAME=""

if [ "$ENVIRONMENT" = "production" ]; then
    ECOSYSTEM_FILE="/home/bish/Downloads/config/ecosystem.global.config.js"
    SERVICE_PORT=3100
    PM2_NAME="crm"
else
    ECOSYSTEM_FILE="/home/bish/Downloads/config/ecosystem.development.config.js"
    SERVICE_PORT=3101
    PM2_NAME="crm-dev"
fi

# Create logs directory if it doesn't exist
mkdir -p logs

log "Starting deployment for CRM Platform in $ENVIRONMENT environment"

# 1. Stop existing PM2 process if running
log "Stopping existing PM2 process..."
pm2 delete $PM2_NAME > /dev/null 2>&1 || true

# 2. Clean up port
log "Cleaning up port $SERVICE_PORT..."
bash /home/bish/Downloads/config/port-cleanup.sh $SERVICE_PORT

# 3. Install dependencies
log "Installing dependencies..."
npm ci

# 4. Run database migrations
log "Running database migrations..."
npx prisma migrate deploy

# 5. Build the application
log "Building application..."
npm run build

# 6. Start the service with PM2
log "Starting service with PM2..."
cd /home/bish/Downloads/config
pm2 start $ECOSYSTEM_FILE --only $PM2_NAME
cd /home/bish/Downloads/sites/crm-platform

# 7. Save PM2 state
log "Saving PM2 state..."
pm2 save --force

# 8. Verify service is running
log "Verifying service..."
if verify_service $SERVICE_PORT; then
    log "Service successfully deployed and running on port $SERVICE_PORT"
    log "Deployment completed successfully!"
    exit 0
else
    log "ERROR: Service verification failed!"
    log "Check logs at: ./logs/err.log"
    pm2 logs $PM2_NAME --lines 50
    exit 1
fi
