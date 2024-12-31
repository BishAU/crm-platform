# Operational Tasks for CRM Platform

## ⚠️ Critical Deployment Instructions

### Production Deployment
**ALWAYS** use the setup-production.sh script for deployments:
```bash
cd /home/bish/Downloads/config
./setup-production.sh crm-platform
```

This script ensures:
- Correct port management (3100)
- Proper process handling
- Automatic backups
- Error page setup
- Rollback capability

### Error Page Management
Static error pages are served from `/etc/nginx/error_pages/`:
- 404.html (Not Found)
- 50x.html (Server Errors)

These pages are:
- JavaScript-independent
- Automatically served during downtime
- Include auto-refresh for maintenance
- Feature ocean-themed animations

## Regular Maintenance Tasks

### 1. Log Rotation
```bash
# Check log sizes
du -h /home/bish/Downloads/config/logs/

# Verify logrotate config
cat /etc/logrotate.d/setup-production
```

### 2. Backup Management
```bash
# List recent backups
ls -l /home/bish/Downloads/config/backups/crm-platform/

# Verify backup contents
ls -l /home/bish/Downloads/config/backups/crm-platform/YYYYMMDD_HHMMSS/
```

### 3. Health Checks
```bash
# Check PM2 processes
pm2 list

# Monitor resource usage
pm2 monit crm-platform

# Verify nginx config
sudo nginx -t
```

### 4. SSL Certificate Management
```bash
# Check certificate expiry
openssl x509 -enddate -noout -in /etc/letsencrypt/live/crm.myinvoices.today-0001/fullchain.pem

# Renew certificates (if needed)
sudo certbot renew
```

## Recovery Procedures

### 1. Service Recovery
If the service is down:
1. Check error pages are being served
2. Verify PM2 process status
3. Check nginx error logs
4. Use setup-production.sh for recovery

### 2. Rollback Procedure
To rollback to previous version:
```bash
cd /home/bish/Downloads/config
./setup-production.sh crm-platform --rollback
```

### 3. Error Page Testing
To verify error pages:
1. Static file 404:
   ```bash
   curl -I https://crm.myinvoices.today/non-existent-file.jpg
   ```
2. Application 404:
   ```bash
   curl -I https://crm.myinvoices.today/non-existent-route
   ```
3. Server Error (requires service stop):
   ```bash
   curl -I https://crm.myinvoices.today
   ```

## Configuration Locations

### Nginx Configuration
- Local: `/home/bish/Downloads/sites/crm-platform/nginx/crm.conf`
- Global: `/home/bish/Downloads/config/nginx/sites-available/crm.myinvoices.today`

### PM2 Configuration
- Ecosystem: `/home/bish/Downloads/config/ecosystem.config.js`
- PM2 logs: `~/.pm2/logs/`

### Application Configuration
- Environment: `.env`
- Next.js: `next.config.js`
- TypeScript: `tsconfig.json`

## Monitoring

### 1. Resource Monitoring
```bash
# Check disk space
df -h /home/bish/Downloads/config/logs/

# Monitor memory
pm2 monit
```

### 2. Error Monitoring
```bash
# Check nginx error logs
tail -f /var/log/nginx/error.log

# Check PM2 logs
pm2 logs crm-platform
```

### 3. Performance Monitoring
```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://crm.myinvoices.today

# Monitor CPU usage
pm2 monit
```

## Important Notes

1. **NEVER** manually modify nginx configurations - use setup-production.sh
2. **ALWAYS** check logs after deployments
3. **VERIFY** error pages are working after configuration changes
4. **BACKUP** before major changes
5. **TEST** recovery procedures regularly

For detailed architectural considerations, see IMPORTANTCONSIDERATIONS.TXT
