#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Print in color
print_color() {
    echo -e "${1}${2}${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_color $RED "Please run as root (sudo)"
    exit 1
fi

# Base directories
CONFIG_DIR="/home/bish/Downloads/config"
NGINX_CONFIG_DIR="/etc/nginx"
SITES_AVAILABLE_DIR="$NGINX_CONFIG_DIR/sites-available"
SITES_ENABLED_DIR="$NGINX_CONFIG_DIR/sites-enabled"

# Create required directories
print_color $YELLOW "Creating required directories..."
mkdir -p "$SITES_AVAILABLE_DIR"
mkdir -p "$SITES_ENABLED_DIR"

# Copy nginx.conf
print_color $YELLOW "Copying main nginx configuration..."
cp "$CONFIG_DIR/nginx.conf" "$NGINX_CONFIG_DIR/nginx.conf"

# Copy site configurations
print_color $YELLOW "Copying site configurations..."
cp -r "$CONFIG_DIR/nginx/sites-available/"* "$SITES_AVAILABLE_DIR/"

# Create symbolic links
print_color $YELLOW "Creating symbolic links..."
for conf in "$CONFIG_DIR/nginx/sites-available/"*.conf; do
    if [ -f "$conf" ]; then
        filename=$(basename "$conf")
        ln -sf "$SITES_AVAILABLE_DIR/$filename" "$SITES_ENABLED_DIR/$filename"
    fi
done

# Test nginx configuration
print_color $YELLOW "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    print_color $YELLOW "Reloading nginx..."
    systemctl reload nginx
    print_color $GREEN "Nginx configuration updated successfully!"
else
    print_color $RED "Nginx configuration test failed!"
    exit 1
fi
