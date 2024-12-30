# Centralized Configuration Management System

## Overview
This system implements a centralized configuration management approach for multiple Node.js platforms. All configurations, deployment scripts, and system settings are managed from a single location to ensure consistency and ease of maintenance.

## Core Principles
1. **Single Source of Truth**: All configurations in `/home/bish/Downloads/config/`
2. **Standardized Ports**: Systematic port allocation for all services
3. **Consistent Deployment**: Unified deployment process across platforms
4. **Centralized Logging**: Consolidated logging strategy
5. **Standardized Security**: Common security configurations

## Quick Reference

### Common Commands
```bash
# Health Checks
curl -Ik https://sitename.myinvoices.today  # Check site status
pm2 status                                  # Check service status
pm2 logs [service-name]                     # View service logs

# Service Management
pm2 stop [service-name]                     # Stop service
pm2 restart [service-name]                  # Restart service
pm2 delete [service-name]                   # Remove service

# Configuration
sudo nginx -t                               # Test NGINX config
sudo systemctl reload nginx                 # Apply NGINX changes
sudo certbot certificates                   # List SSL certificates

# Port Management
sudo lsof -i :[port]                       # Check port usage
netstat -tulpn | grep LISTEN               # List all used ports
```

### Important File Locations
```
/home/bish/Downloads/config/nginx/sites-available/  # NGINX configs
/home/bish/Downloads/config/ecosystem.*.config.js   # PM2 configs
/home/bish/Downloads/config/logs/                   # System logs
/etc/letsencrypt/live/                             # SSL certificates
```

## Project Organization
The project is organized into two main directories:
1. `/home/bish/Downloads/sites/`: Contains all platform projects
2. `/home/bish/Downloads/config/`: Contains all global configuration files

### Directory Structure
```
/home/bish/Downloads/
├── config/                     # Central configuration directory
│   ├── nginx/                 # NGINX configurations
│   │   ├── sites-available/  # Site configurations
│   │   ├── sites-enabled/    # Symlinks to active configs
│   │   └── global.conf       # Global NGINX settings
│   ├── ecosystem.*.config.js  # PM2 configuration files
│   ├── deploy-*.sh           # Deployment scripts
│   └── logs/                 # Centralized logs
└── sites/                     # Platform projects
    ├── vcc-platform/
    ├── crm-platform/
    └── other-platforms/
```

### Project Structure
Each platform should follow this structure:
```
sites/platform-name/
├── src/            # Source code
├── dist/           # Build output
├── logs/           # PM2 logs
├── deploy.sh       # Deployment script
└── package.json    # Dependencies and scripts
```

## Configuration Management

### 1. NGINX Configuration
- **Location**: `/home/bish/Downloads/config/nginx/`
- **Structure**:
  - `sites-available/`: Individual site configurations
  - `sites-enabled/`: Symlinks to active configurations
  - `global.conf`: Shared settings and upstream definitions
- **Best Practices**:
  - One configuration file per domain
  - Use standardized templates
  - Maintain SSL configurations centrally
  - Include security headers consistently

### 2. Process Management
- **Location**: `/home/bish/Downloads/config/`
- **Files**:
  - `ecosystem.global.config.js`: Production PM2 settings
  - `ecosystem.development.config.js`: Development PM2 settings
- **Features**:
  - Standardized logging
  - Memory limits
  - Restart policies
  - Environment variables

### 3. Deployment Scripts
- **Location**: `/home/bish/Downloads/config/`
- **Key Scripts**:
  - `deploy-all.sh`: Full system deployment
  - `deploy-projects.sh`: Individual project deployment
  - `setup-production.sh`: Production environment setup
  - `port-cleanup.sh`: Port management

## Port Assignments

### Base Port Structure
- Production ports start at 3000 and increment by 100 (X000)
- Development ports are production port + 1 (X001)
- Backend services increment by 10 from their frontend port

### Production Environments (X000)
- VCC Platform: 3000
- CRM Platform: 3100
- WWW Platform: 3200
- Raffle Platform: 3300
- Skyhigh Platform Frontend: 3400
- Skyhigh Platform Backend: 3410
- Spraiybooth Platform: 3500
- Rockregister Platform: 3600
- tradertokenbot: 3700
- Kuma Platform: 3800

### Development Environments (X001)
- VCC Platform Client: 3001
- VCC Platform Server: 3002 (Exception to standard pattern)
- CRM Platform: 3101
- WWW Platform: 3201
- Raffle Platform: 3301
- Skyhigh Platform Frontend: 3401
- Skyhigh Platform Backend: 3411
- Spraiybooth Platform: 3501
- Rockregister Platform: 3601
- tradertokenbot: 3701
- Kuma Platform: 3801

### New Projects
- Production ports must start at next available X00 increment
- Development ports must be production port + 1
- Backend services must use X10 increment from their frontend port

## Adding a New Site

### 1. Update Port Configuration
1. Choose the next available port increment (X00) from the list above
2. Add the port assignments to ports.config.md
3. Update the services array in deploy-all.sh and PROJECT_PORTS in deploy-projects.sh

### 2. Create Nginx Configuration
1. Create a new file in nginx/sites-available with the format: `sitename.myinvoices.today`
2. Use the template below, replacing PORT with your production port:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name sitename.myinvoices.today;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name sitename.myinvoices.today;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/sitename.myinvoices.today/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sitename.myinvoices.today/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        proxy_pass http://127.0.0.1:PORT;
        include /home/bish/Downloads/config/nginx/proxy_params;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://127.0.0.1:PORT;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

3. Create a symbolic link in nginx/sites-enabled:
```bash
cd /home/bish/Downloads/config/nginx/sites-enabled
ln -s ../sites-available/sitename.myinvoices.today sitename.myinvoices.today
```

### 3. Update PM2 Configurations
1. Add the new service to ecosystem.global.config.js for production:
```javascript
{
  name: 'sitename-platform',
  script: 'npm',
  args: "start",
  cwd: '/home/bish/Downloads/sites/sitename-platform',
  watch: false,
  env: {
    PORT: PORT, // Your production port
    NODE_ENV: 'production'
  },
  error_file: '/home/bish/Downloads/sites/sitename-platform/logs/err.log',
  out_file: '/home/bish/Downloads/sites/sitename-platform/logs/out.log',
}
```

2. Add the development configuration to ecosystem.development.config.js:
```javascript
{
  name: 'sitename-platform-dev',
  script: 'npm',
  args: "run dev",
  cwd: '/home/bish/Downloads/sites/sitename-platform',
  watch: false,
  env: {
    PORT: PORT + 1, // Your development port
    NODE_ENV: 'development'
  },
  error_file: '/home/bish/Downloads/sites/sitename-platform/logs/err.log',
  out_file: '/home/bish/Downloads/sites/sitename-platform/logs/out.log',
}
```

### 4. SSL Certificate
1. Generate SSL certificate using Certbot:
```bash
sudo certbot certonly --nginx -d sitename.myinvoices.today
```

## Running Services

### Cold Start Procedure
Before starting services, follow this sequence:

1. Clean up ports:
```bash
# Clean up all ports (both prod and dev)
bash /home/bish/Downloads/config/port-cleanup.sh

# Clean only production ports
bash /home/bish/Downloads/config/port-cleanup.sh prod

# Clean only development ports
bash /home/bish/Downloads/config/port-cleanup.sh dev
```

2. Reset PM2 saved state:
```bash
pm2 save --force
```

3. Build projects (in each platform directory):
```bash
cd platform-directory
npm run build
```

4. Start services:
```bash
# Start all production services
pm2 start /home/bish/Downloads/config/ecosystem.global.config.js

# Or start specific service
pm2 start /home/bish/Downloads/config/ecosystem.global.config.js --only service-name
```

5. Verify services:
```bash
pm2 status
pm2 logs
```

**Note:** After making changes to the Nginx configuration, you must restart all services using the global configuration files.

### Production
```bash
# Clean ports and start all production services
bash /home/bish/Downloads/config/port-cleanup.sh prod && \
pm2 start /home/bish/Downloads/config/ecosystem.global.config.js

# Start specific service
bash /home/bish/Downloads/config/port-cleanup.sh prod && \
pm2 start /home/bish/Downloads/config/ecosystem.global.config.js --only service-name
```

### Development
```bash
# Clean ports and start all development services
bash /home/bish/Downloads/config/port-cleanup.sh dev && \
pm2 start /home/bish/Downloads/config/ecosystem.development.config.js

# Start specific service
bash /home/bish/Downloads/config/port-cleanup.sh dev && \
pm2 start /home/bish/Downloads/config/ecosystem.development.config.js --only service-name-dev
```

## Emergency Recovery Procedures

### 1. Service Failure Recovery
```bash
# 1. Check logs
pm2 logs [service-name] --lines 100

# 2. Stop failed service
pm2 stop [service-name]

# 3. Clean up port
bash /home/bish/Downloads/config/port-cleanup.sh prod

# 4. Restore from last known good state
cd /home/bish/Downloads/backups/
# Find latest backup
latest=$(ls -t | head -1)
cp -r $latest/ecosystem.global.config.js /home/bish/Downloads/config/

# 5. Restart service
pm2 start /home/bish/Downloads/config/ecosystem.global.config.js --only [service-name]
```

### 2. SSL Certificate Emergency Renewal
```bash
# Check certificate status
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal -d domain.myinvoices.today

# Verify NGINX config
sudo nginx -t && sudo systemctl reload nginx
```

### 3. Database Connection Issues
```bash
# 1. Check if database is accessible
nc -zv database-host 5432

# 2. Verify environment variables
pm2 env [service-name] | grep DATABASE_URL

# 3. Restart service with correct config
pm2 restart [service-name] --update-env
```

## Version Control Guidelines

### 1. Configuration Changes
- Always commit configuration changes to version control
- Use descriptive commit messages
- Include ticket/issue reference if applicable
- Document significant changes in commit body

### 2. Branch Strategy
```bash
# Feature/bugfix branches
git checkout -b config/feature-name
git checkout -b config/bugfix-name

# Emergency hotfixes
git checkout -b config/hotfix-name
```

### 3. Deployment Tags
```bash
# Tag major deployments
git tag -a v1.2.3 -m "Production deployment 2024-01-01"
git push origin v1.2.3
```

## Backup and Restore Procedures

### 1. Manual Backup
```bash
# Backup NGINX configurations
sudo tar -czf nginx-config-$(date +%Y%m%d).tar.gz /home/bish/Downloads/config/nginx/

# Backup PM2 configurations
pm2 save
cp /home/bish/Downloads/config/ecosystem.*.config.js /home/bish/Downloads/backups/$(date +%Y%m%d)/

# Backup SSL certificates
sudo tar -czf ssl-certs-$(date +%Y%m%d).tar.gz /etc/letsencrypt/
```

### 2. Automated Backups
- Daily backups are stored in `/home/bish/Downloads/backups/`
- Retention period: 30 days
- Includes:
  - NGINX configurations
  - PM2 configurations
  - SSL certificates
  - Environment variables
  - Logs (last 7 days)

### 3. Restore Procedure
```bash
# 1. Stop all services
pm2 delete all

# 2. Restore configurations
cp -r /home/bish/Downloads/backups/[date]/nginx/* /home/bish/Downloads/config/nginx/
cp -r /home/bish/Downloads/backups/[date]/ecosystem.*.config.js /home/bish/Downloads/config/

# 3. Verify configurations
sudo nginx -t

# 4. Restart services
bash /home/bish/Downloads/config/setup-production.sh
```

## Common Scenarios and Solutions

### 1. Adding New Domain
```bash
# 1. Generate SSL certificate
sudo certbot certonly --nginx -d newdomain.myinvoices.today

# 2. Create NGINX configuration
cp /home/bish/Downloads/config/nginx/sites-available/template.conf \
   /home/bish/Downloads/config/nginx/sites-available/newdomain.myinvoices.today

# 3. Update configuration
sed -i 's/template.myinvoices.today/newdomain.myinvoices.today/g' \
    /home/bish/Downloads/config/nginx/sites-available/newdomain.myinvoices.today

# 4. Enable site
ln -s ../sites-available/newdomain.myinvoices.today \
    /home/bish/Downloads/config/nginx/sites-enabled/

# 5. Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### 2. Updating SSL Certificates
```bash
# Check expiration
sudo certbot certificates

# Renew all certificates
sudo certbot renew --dry-run  # Test renewal
sudo certbot renew           # Actual renewal

# Reload NGINX
sudo systemctl reload nginx
```

### 3. Performance Optimization
- Monitor resource usage
```bash
pm2 monit                    # Monitor CPU/Memory
tail -f /var/log/nginx/access.log | goaccess  # Analyze traffic
```

- Optimize NGINX configuration
```nginx
# Add to server block for static content
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

### 4. Security Hardening
```bash
# 1. Update SSL configuration
mozilla-ssl-config generate  # Generate modern SSL config

# 2. Enable rate limiting
location / {
    limit_req zone=one burst=5;
}

# 3. Configure firewall
sudo ufw allow 'Nginx Full'
sudo ufw deny from [blocked-ip]
```

## Environment Variables
Each platform requires these environment variables:
- `NODE_ENV`: 'production' or 'development'
- `PORT`: As per port assignments above
- `DATABASE_URL`: Database connection string
- Additional platform-specific variables as needed

## Security Configuration
1. SSL/TLS Setup:
   - All production services must use HTTPS
   - SSL certificates managed via Certbot
   - Auto-renewal must be configured
   
2. Firewall Rules:
   - Only required ports should be exposed
   - Development ports should not be publicly accessible
   - Use UFW for firewall management

3. Access Control:
   - Use nginx basic auth for development environments
   - IP whitelist for sensitive endpoints
   - Regular audit of access logs

## Common Mistakes
1. Creating configuration files in project directories instead of /config
2. Modifying project-specific package.json files for port configuration
3. Using incorrect port increments (must use X00 for prod, X01 for dev)
4. Not following backend service port convention (X10 increment)
5. Port conflicts with other services
6. Not checking PM2 logs when services fail to start
7. Forgetting to rebuild after code changes
8. **Nginx Configuration Conflicts:** Ensure that there is only one Nginx configuration file for each site. Avoid having duplicate configurations in both `/etc/nginx/sites-available` and project directories.

## Maintenance
1. Regularly check PM2 logs for errors
2. Monitor disk space usage in logs directory
3. Keep nginx and PM2 configurations in sync
4. Backup configuration files in /config before making changes
5. Regular security audits and updates
6. SSL certificate renewal monitoring
7. Log rotation and cleanup
