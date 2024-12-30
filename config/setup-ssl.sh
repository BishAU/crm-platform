#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to print in color
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_color $RED "Please run as root (sudo)"
    exit 1
fi

# Domain configuration
DOMAIN="vcc.myinvoices.today"
EMAIL="admin@myinvoices.today"  # Change this to your email

# Function to check if certbot is installed
check_certbot() {
    if ! command -v certbot &> /dev/null; then
        print_color $YELLOW "Certbot not found. Installing..."
        apt-get update
        apt-get install -y certbot python3-certbot-nginx
    else
        print_color $GREEN "Certbot is already installed"
    fi
}

# Function to check if certificate exists
check_certificate() {
    if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        print_color $GREEN "Certificate already exists for $DOMAIN"
        return 0
    else
        return 1
    fi
}

# Function to obtain certificate
obtain_certificate() {
    print_color $YELLOW "Obtaining SSL certificate for $DOMAIN..."
    
    # Stop nginx temporarily to free up port 80
    systemctl stop nginx
    
    # Get the certificate
    certbot certonly --standalone \
        --non-interactive \
        --agree-tos \
        --email "$EMAIL" \
        --domains "$DOMAIN" \
        --preferred-challenges http
    
    # Start nginx again
    systemctl start nginx
    
    if [ $? -eq 0 ]; then
        print_color $GREEN "Certificate obtained successfully"
        return 0
    else
        print_color $RED "Failed to obtain certificate"
        return 1
    fi
}

# Function to set up auto-renewal
setup_auto_renewal() {
    print_color $YELLOW "Setting up automatic renewal..."
    
    # Test renewal process
    certbot renew --dry-run
    
    if [ $? -eq 0 ]; then
        print_color $GREEN "Auto-renewal configured successfully"
        
        # Add post-renewal hook to reload nginx
        mkdir -p /etc/letsencrypt/renewal-hooks/post
        cat > /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh << 'EOF'
#!/bin/bash
systemctl reload nginx
EOF
        chmod +x /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh
        
        print_color $GREEN "Added nginx reload hook for certificate renewal"
    else
        print_color $RED "Auto-renewal configuration failed"
        return 1
    fi
}

# Main function
main() {
    print_color $YELLOW "Starting SSL setup for $DOMAIN"
    echo "================================="
    
    # Check and install certbot if needed
    check_certbot
    
    # Check if certificate already exists
    if ! check_certificate; then
        # Obtain new certificate
        obtain_certificate || exit 1
    fi
    
    # Set up auto-renewal
    setup_auto_renewal
    
    # Reload nginx to apply changes
    systemctl reload nginx
    
    print_color $GREEN "\nSSL setup completed successfully!"
    echo "Certificate location: /etc/letsencrypt/live/$DOMAIN/"
    echo "Auto-renewal is configured and will run twice daily via systemd timer"
    echo "================================="
}

# Run main function
main
