#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
VCC_DOMAIN="vcc.myinvoices.today"
LOCAL_URL="http://localhost:3000"
HTTP_URL="http://$VCC_DOMAIN"
HTTPS_URL="https://$VCC_DOMAIN"
TIMEOUT=5
MAX_RESPONSE_TIME=2000  # milliseconds

# Function to print in color
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check HTTP status
check_http_status() {
    local url=$1
    local expected_status=${2:-200}
    local allow_redirect=${3:-false}
    
    print_color $YELLOW "Checking HTTP status for $url"
    local start=$(date +%s%N)
    local status=$(curl -s -o /dev/null -w "%{http_code}" -m $TIMEOUT "$url")
    local end=$(date +%s%N)
    local duration=$(( ($end - $start) / 1000000 )) # Convert to milliseconds
    
    if [ "$status" -eq "$expected_status" ] || { [ "$allow_redirect" = "true" ] && [ "$status" -eq 301 ]; }; then
        print_color $GREEN "✓ Status: $status (${duration}ms)"
        if [ $duration -gt $MAX_RESPONSE_TIME ]; then
            print_color $YELLOW "⚠ Response time above threshold: ${duration}ms > ${MAX_RESPONSE_TIME}ms"
        fi
        return 0
    else
        print_color $RED "✗ Status: $status (expected $expected_status)"
        return 1
    fi
}

# Function to check PM2 status
check_pm2_status() {
    print_color $YELLOW "Checking PM2 status"
    
    local pm2_status=$(pm2 jlist | jq -r '.[] | select(.name=="vcc-platform") | .pm2_env.status')
    if [ "$pm2_status" = "online" ]; then
        print_color $GREEN "✓ PM2 status: online"
        return 0
    else
        print_color $RED "✗ PM2 status: $pm2_status"
        return 1
    fi
}

# Function to check port availability
check_port() {
    local port=3000
    print_color $YELLOW "Checking port $port"
    
    if netstat -tuln | grep ":$port " > /dev/null; then
        local pid=$(lsof -ti:$port)
        print_color $GREEN "✓ Port $port is in use by PID $pid"
        return 0
    else
        print_color $RED "✗ Port $port is not in use"
        return 1
    fi
}

# Function to check nginx configuration
check_nginx() {
    print_color $YELLOW "\nChecking nginx configuration:"
    local failed=0

    # Check nginx is running
    if systemctl is-active --quiet nginx; then
        print_color $GREEN "✓ nginx is running"
    else
        print_color $RED "✗ nginx is not running"
        failed=1
    fi

    # Test nginx configuration
    if sudo nginx -t &>/dev/null; then
        print_color $GREEN "✓ nginx configuration is valid"
    else
        print_color $RED "✗ nginx configuration is invalid"
        failed=1
    fi

    # Check if site is enabled
    if [ -L "/etc/nginx/sites-enabled/vcc-platform.conf" ]; then
        print_color $GREEN "✓ Site is enabled in nginx"
    else
        print_color $RED "✗ Site is not enabled in nginx"
        failed=1
    fi

    return $failed
}

# Function to check SSL certificate
check_ssl() {
    print_color $YELLOW "\nChecking SSL configuration:"
    local failed=0

    # Check if SSL certificate exists
    if [ -f "/etc/letsencrypt/live/$VCC_DOMAIN/fullchain.pem" ]; then
        print_color $GREEN "✓ SSL certificate exists"
        
        # Check certificate expiry
        local expiry=$(sudo openssl x509 -enddate -noout -in "/etc/letsencrypt/live/$VCC_DOMAIN/fullchain.pem")
        print_color $GREEN "✓ Certificate expiry: $expiry"
        
        # Check SSL connection
        local ssl_verify=$(curl -sI --insecure "https://$VCC_DOMAIN" | head -n 1)
        if [[ $ssl_verify == *"200 OK"* ]]; then
            print_color $GREEN "✓ SSL connection successful"
        else
            print_color $RED "✗ SSL connection failed"
            failed=1
        fi
    else
        print_color $YELLOW "⚠ SSL certificate not found (using self-signed)"
    fi

    return $failed
}

# Main health check
main() {
    echo "Starting VCC Platform Health Check"
    echo "================================="
    
    local failed=0
    
    # Check PM2 and port first (local checks)
    check_pm2_status || failed=1
    check_port || failed=1
    
    # Check nginx configuration
    check_nginx || failed=1
    
    # Check SSL configuration
    check_ssl || failed=1
    
    # Check local endpoint
    print_color $YELLOW "\nChecking local endpoint:"
    check_http_status "$LOCAL_URL" || failed=1
    
    # Check HTTP endpoints (allow redirects)
    print_color $YELLOW "\nChecking HTTP endpoints:"
    check_http_status "$HTTP_URL" 200 true || failed=1
    check_http_status "$HTTP_URL/assets/main.css" 200 true || failed=1
    check_http_status "$HTTP_URL/assets/main.js" 200 true || failed=1
    check_http_status "$HTTP_URL/assets/vendor.js" 200 true || failed=1
    check_http_status "$HTTP_URL/api/health" || failed=1
    
    # Check HTTPS endpoints
    print_color $YELLOW "\nChecking HTTPS endpoints:"
    check_http_status "$HTTPS_URL" || failed=1
    check_http_status "$HTTPS_URL/assets/main.css" || failed=1
    check_http_status "$HTTPS_URL/assets/main.js" || failed=1
    check_http_status "$HTTPS_URL/assets/vendor.js" || failed=1
    check_http_status "$HTTPS_URL/api/health" || failed=1
    
    echo "================================="
    if [ $failed -eq 0 ]; then
        print_color $GREEN "All checks passed!"
    else
        print_color $RED "Some checks failed!"
    fi
    
    return $failed
}

# Run main function
main
