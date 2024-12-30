#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to test a service
test_service() {
    local name=$1
    local port=$2
    local endpoint=${3:-"/"}
    
    echo -e "\n${YELLOW}Testing $name on port $port...${NC}"
    
    # Try both the health endpoint and root
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/health)
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓ Health check successful${NC}"
        return 0
    fi
    
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port$endpoint)
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓ Service responding on $endpoint${NC}"
        return 0
    else
        echo -e "${RED}✗ Service not responding (HTTP $response)${NC}"
        return 1
    fi
}

echo "Starting service tests..."

# Test each service
test_service "VCC Platform" 3000
test_service "VCC Platform API" 3010 "/api"
test_service "CRM Platform" 3100
test_service "WWW Platform" 3200
test_service "Raffle Platform" 3300
test_service "Skyhigh Frontend" 3400
test_service "Skyhigh Backend" 3410 "/api"
test_service "Spraiybooth Platform" 3500
test_service "Rockregister Platform" 3600
test_service "Tradertokenbot Platform" 3700
test_service "Kuma Platform" 3800
test_service "ABS API" 3020 "/api"

# Check PM2 status
echo -e "\n${YELLOW}PM2 Process Status:${NC}"
pm2 list

# Check for any error logs
echo -e "\n${YELLOW}Checking error logs...${NC}"
for service in vcc-platform crm-platform www-platform raffle-platform skyhigh-platform spraiybooth-platform rockregister-platform tradertokenbot-platform kuma-platform; do
    error_log="/home/bish/Downloads/sites/$service/logs/err.log"
    if [ -f "$error_log" ] && [ -s "$error_log" ]; then
        echo -e "\n${RED}Errors found in $service:${NC}"
        tail -n 5 "$error_log"
    fi
done