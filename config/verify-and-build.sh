#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

SITES_DIR="/home/bish/Downloads/sites"

# Function to verify and build a project
verify_and_build() {
    local project_dir="$1"
    local project_name="$2"
    
    echo -e "\n${GREEN}Checking $project_name...${NC}"
    
    if [ ! -d "$project_dir" ]; then
        echo -e "${RED}Directory not found: $project_dir${NC}"
        return 1
    fi
    
    cd "$project_dir"
    
    if [ ! -f "package.json" ]; then
        echo -e "${RED}package.json not found in $project_dir${NC}"
        return 1
    fi
    
    echo "Installing dependencies..."
    npm install
    
    echo "Building project..."
    npm run build
    
    mkdir -p logs
}

# Verify and build each project
verify_and_build "$SITES_DIR/vcc-platform" "VCC Platform"
verify_and_build "$SITES_DIR/crm-platform" "CRM Platform"
verify_and_build "$SITES_DIR/myinvoices-www" "WWW Platform"
verify_and_build "$SITES_DIR/raffle-platform" "Raffle Platform"
verify_and_build "$SITES_DIR/skyhigh-platform" "Skyhigh Platform"
verify_and_build "$SITES_DIR/spraiybooth" "Spraiybooth Platform"
verify_and_build "$SITES_DIR/rockregister-platform" "Rockregister Platform"
verify_and_build "$SITES_DIR/tradertokenbot-platform" "Tradertokenbot Platform"
verify_and_build "$SITES_DIR/kuma-platform" "Kuma Platform"

echo -e "\n${GREEN}All projects verified and built${NC}"