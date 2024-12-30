# Deployment Guide

## Prerequisites

### 1. SSL Certificates
Before deploying, ensure SSL certificates are installed:
```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificates for domains
sudo certbot certonly --nginx -d vcc.myinvoices.today
```

### 2. Nginx Setup
Run the nginx setup script:
```bash
sudo bash /home/bish/Downloads/config/setup-nginx.sh
```

## Port Assignments

### Production Environments (X000)
- VCC Platform: 3000
- CRM Platform: 3100
- WWW Platform: 3200
- Raffle Platform: 3300
- Skyhigh Platform Frontend: 3400
- Skyhigh Platform Backend: 3410
- Spraybooth Platform: 3500
- Rockregister Platform: 3600
- tradertokenbot: 3700
- Kuma Platform: 3800

### Development Environments (X001)
Development ports are production port + 1 (e.g., 3001 for VCC Platform Dev)

## Deployment Tools

### 1. deploy-all.sh
Full deployment script that handles all services:
- Automatic backup before deployment
- Clean build process
- Health checks
- Rollback on failure
- Detailed logging
- Deployment summary

Features:
- Port conflict resolution
- Service health monitoring
- Automatic rollback on failure
- Backup of all configurations
- Detailed logging

### 2. deploy-projects.sh
Interactive deployment for specific services:
- Choose which services to deploy
- Individual service health checks
- Rollback capabilities

### 3. port-cleanup.sh
Utility to clean up ports:
```bash
# Clean all ports
bash config/port-cleanup.sh all

# Clean only production ports
bash config/port-cleanup.sh prod

# Clean only development ports
bash config/port-cleanup.sh dev
```

### 4. check-vcc-health.sh
Health check utility for VCC platform:
- HTTP status checks
- SSL certificate validation
- API endpoint testing
- Static asset verification
- Database connectivity check

## Deployment Process

### Pre-deployment Checklist
1. Ensure all code is committed and pushed
2. Check environment variables are set correctly
3. Verify database connections
4. Check disk space for logs and backups
5. Verify SSL certificates are valid
6. Check nginx configuration

### Standard Deployment Steps
1. **Setup SSL and Nginx**
   ```bash
   # Install SSL certificates if needed
   sudo certbot certonly --nginx -d vcc.myinvoices.today

   # Configure nginx
   sudo bash config/setup-nginx.sh
   ```

2. **Backup Current State**
   ```bash
   # Automatic backup is created in /home/bish/Downloads/backups/YYYYMMDD_HHMMSS/
   ```

3. **Clean Up Environment**
   ```bash
   # Stop all services
   pm2 delete all
   

   # Clean up ports (only the ports used by the current project)
   bash config/port-cleanup.sh all
   # Reset PM2 state
   pm2 save --force
   ```

4. **Deploy Services**
   ```bash
   # Deploy all services
   bash config/deploy-all.sh
   
   # Or deploy specific service
   bash config/deploy-projects.sh
   ```

5. **Verify Deployment**
   ```bash
   # Check service status
   pm2 list
   
   # Check logs
   pm2 logs
   
   # Run health checks
   bash config/check-vcc-health.sh
   ```

### Rollback Procedure
Automatic rollback occurs on deployment failure. For manual rollback:
1. Find the backup in `/home/bish/Downloads/backups/`
2. Stop the current service
3. Restore from backup
4. Restart the service

## Monitoring

### Log Locations
- PM2 Logs: `/home/bish/Downloads/sites/[service-name]/logs/`
- Deployment Logs: `/home/bish/Downloads/backups/YYYYMMDD_HHMMSS/deployment.log`
- Nginx Logs: `/var/log/nginx/`

### Health Monitoring
- Each service has `/api/health` endpoint
- Regular health checks are performed
- Automatic rollback on health check failure

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Clean up specific port
   bash config/port-cleanup.sh prod
   ```

2. **Build Failures**
   - Check logs in service directory
   - Verify node_modules is up to date
   - Check for TypeScript errors

3. **Health Check Failures**
   - Check service logs
   - Verify database connectivity
   - Check environment variables

4. **PM2 Issues**
   ```bash
   # Reset PM2
   pm2 delete all
   pm2 save --force
   ```

5. **Nginx Issues**
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Check logs
   sudo tail -f /var/log/nginx/error.log
   ```

6. **SSL Issues**
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Renew certificates
   sudo certbot renew --dry-run
   ```

### Getting Help
1. Check deployment logs in backup directory
2. Review service-specific logs
3. Check PM2 logs for runtime errors
4. Verify nginx configuration

## Best Practices

1. **Always Use Scripts**
   - Don't manually start/stop services
   - Use provided deployment tools
   - Follow the standard process

2. **Monitor Deployments**
   - Watch deployment progress
   - Check health endpoints
   - Verify all services are running

3. **Backup Management**
   - Keep recent backups
   - Verify backup integrity
   - Clean old backups periodically

4. **Configuration Management**
   - Keep all configs in /config directory
   - Use environment variables
   - Document any changes

## Security Considerations

1. **Port Security**
   - Only required ports should be exposed
   - Development ports should not be public
   - Use proper firewall rules

2. **Access Control**
   - Use nginx basic auth for dev environments
   - Implement IP whitelisting
   - Regular security audits

3. **SSL/TLS**
   - Keep certificates updated
   - Use strong cipher suites
   - Regular certificate monitoring

## Maintenance

1. **Regular Tasks**
   - Monitor disk space
   - Review logs
   - Update dependencies
   - Check SSL certificates

2. **Cleanup Tasks**
   - Remove old backups
   - Clean log files
   - Update configurations

3. **Updates**
   - Keep PM2 updated
   - Update node versions
   - Maintain dependencies

Remember: Always use the provided tools and follow the standard process for deployments. This ensures consistency and reliability in our deployment process.
