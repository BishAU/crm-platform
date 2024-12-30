# Nginx Configuration Structure

## Directory Structure
```
/home/bish/Downloads/config/nginx/
├── global.conf          # Global nginx settings
├── proxy_params         # Shared proxy parameters
└── sites-available/     # All site configurations
    ├── vcc.myinvoices.today
    ├── crm.myinvoices.today
    ├── www.myinvoices.today
    ├── skyhigh.myinvoices.today
    ├── tradertokenbot.myinvoices.today
    ├── spraiybooth.myinvoices.today
    ├── raffle.myinvoices.today
    └── rockregister.myinvoices.today
```

## Configuration Standards

1. Naming Convention:
   - All site configurations must use the format: `[service].myinvoices.today`
   - No .conf suffix in the filename
   - Use lowercase, hyphen-separated words for service names

2. File Location:
   - All site configurations must be in `/home/bish/Downloads/config/nginx/sites-available/`
   - Symlinks in `/etc/nginx/sites-enabled/` point to these configurations

3. Configuration Template:
```nginx
server {
    listen 80;
    server_name [service].myinvoices.today;

    location / {
        proxy_pass http://127.0.0.1:[port];
        include /home/bish/Downloads/config/nginx/proxy_params;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

## Adding a New Site

IMPORTANT: Due to permission restrictions, always follow this workflow:

1. Create the configuration file in a temporary location:
   ```bash
   # First create in user directory
   cp /home/bish/Downloads/config/nginx/template.conf ~/temp_config
   nano ~/temp_config  # Make your changes
   
   # Then move to nginx directory with proper permissions
   sudo cp ~/temp_config /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today
   sudo chown root:root /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today
   sudo chmod 644 /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today
   rm ~/temp_config  # Clean up
   ```

2. Create the symlink:
   ```bash
   sudo ln -sf /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today /etc/nginx/sites-enabled/
   ```

3. Test and reload:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Port Assignments

| Service        | Port  |
|----------------|-------|
| VCC            | 3001  |
| CRM            | 3100  |
| WWW            | 3201  |
| Skyhigh        | 3400  |
| Spraiybooth    | 3500  |
| Rockregister   | 3600  |
| Tradertokenbot | 3700  |
| Raffle         | 3800  |

## Common Issues

1. Permission Issues:
   - Always create new configurations in your home directory first
   - Use sudo to copy files to nginx directories
   - Set proper ownership (root:root) and permissions (644)
   ```bash
   # Correct way to edit existing configuration
   sudo cp /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today ~/temp_edit
   nano ~/temp_edit  # Make your changes
   sudo cp ~/temp_edit /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today
   sudo chown root:root /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today
   sudo chmod 644 /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today
   rm ~/temp_edit  # Clean up
   ```

2. Port Already in Use:
   ```bash
   sudo lsof -i :[port]
   sudo kill [PID]
   ```

3. Configuration Test Failed:
   ```bash
   sudo nginx -T | grep [service].myinvoices.today
   sudo nginx -t
   ```

## Maintenance

1. Removing a Site:
   ```bash
   sudo rm /etc/nginx/sites-enabled/[service].myinvoices.today
   sudo mv /home/bish/Downloads/config/nginx/sites-available/[service].myinvoices.today /home/bish/Downloads/config/nginx/sites-available/archived/
   sudo systemctl reload nginx
   ```

2. Updating Global Settings:
   ```bash
   sudo cp /home/bish/Downloads/config/nginx/global.conf ~/temp_global
   nano ~/temp_global  # Make your changes
   sudo cp ~/temp_global /home/bish/Downloads/config/nginx/global.conf
   sudo chown root:root /home/bish/Downloads/config/nginx/global.conf
   sudo chmod 644 /home/bish/Downloads/config/nginx/global.conf
   rm ~/temp_global  # Clean up
   sudo nginx -t
   sudo systemctl reload nginx
