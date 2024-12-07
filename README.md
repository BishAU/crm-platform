# Port Conventions and Configuration Guidelines

## IMPORTANT: Global Configuration Only
All configuration files MUST be stored in `/home/bish/Downloads/` directory only.
DO NOT create or modify configuration files within individual project directories.

## Configuration Files
1. `/home/bish/Downloads/nginx/global.conf`: Production upstream configurations
2. `/home/bish/Downloads/ecosystem.global.config.js`: Production PM2 configuration
3. `/home/bish/Downloads/ecosystem.development.config.js`: Development PM2 configuration

## Port Assignments

### Production Environments (X000)
- VCC Platform: 3000 (vcc.myinvoices.today)
- CRM Platform: 4000 (crm.myinvoices.today)
- WWW Platform: 5000 (www.myinvoices.today)
- Raffle Platform: 6000 (raffle.myinvoices.today)

### Development Environments (X001)
- VCC Platform: 3001
- CRM Platform: 4001
- WWW Platform: 5001
- Raffle Platform: 6001

### New Projects
- Production ports must be 11000 and above
- Development ports must be production port + 1 (e.g., 11000 -> 11001)

## Project Structure
Each platform should follow this structure:
```
platform-name/
├── src/            # Source code
├── dist/           # Build output
├── logs/           # PM2 logs
├── deploy.sh       # Deployment script
└── package.json    # Dependencies and scripts
```

## Running Services

### Production
```bash
# Start all production services
pm2 start /home/bish/Downloads/ecosystem.global.config.js

# Start specific service
pm2 start /home/bish/Downloads/ecosystem.global.config.js --only vcc
```

### Development
```bash
# Start all development services
pm2 start /home/bish/Downloads/ecosystem.development.config.js

# Start specific service
pm2 start /home/bish/Downloads/ecosystem.development.config.js --only vcc-dev
```

## Build and Deploy
Each platform has a `deploy.sh` script that handles:
1. Building the application
2. Setting up environment variables
3. Restarting the PM2 service

To deploy a platform:
```bash
cd platform-name
./deploy.sh
```

## Validation Steps
1. Check nginx config: `sudo nginx -t`
2. Verify symlinks:
   ```bash
   ls -l /etc/nginx/global.conf
   ls -l /etc/nginx/proxy_params
   ```
3. Test production services:
   ```bash
   curl -I http://localhost:3000  # VCC
   curl -I http://localhost:4000  # CRM
   curl -I http://localhost:5000  # WWW
   curl -I http://localhost:6000  # Raffle
   ```
4. Test development services:
   ```bash
   curl -I http://localhost:3001  # VCC Dev
   curl -I http://localhost:4001  # CRM Dev
   curl -I http://localhost:5001  # WWW Dev
   curl -I http://localhost:6001  # Raffle Dev
   ```

## Environment Variables
Each platform requires these environment variables:
- `NODE_ENV`: 'production' or 'development'
- `PORT`: As per port assignments above
- `DATABASE_URL`: Database connection string
- Additional platform-specific variables as needed

## Emergency Procedures
1. If services are unavailable:
   ```bash
   # Check PM2 status
   pm2 status
   
   # View logs
   pm2 logs [service-name]
   
   # Restart service
   pm2 restart [service-name]
   
   # Delete and restart service
   pm2 delete [service-name]
   pm2 start /home/bish/Downloads/ecosystem.global.config.js --only [service-name]
   ```

2. If nginx fails:
   ```bash
   # Check error logs
   sudo tail -f /var/log/nginx/error.log
   
   # Test configuration
   sudo nginx -t
   
   # Restart nginx
   sudo systemctl restart nginx
   ```

## Common Mistakes
1. Creating configuration files in project directories
2. Modifying project-specific package.json files for port configuration
3. Using production ports for development
4. Incorrect symlink locations
5. Missing or incorrect proxy_params
6. Port conflicts with other services
7. Not checking PM2 logs when services fail to start
8. Forgetting to rebuild after code changes

## Maintenance
1. Regularly check PM2 logs for errors
2. Monitor disk space usage in logs directory
3. Keep nginx and PM2 configurations in sync
4. Backup configuration files before making changes
