# CRM Platform

## API Route Handlers

### Authentication and Route Handler Pattern

Next.js App Router requires a specific pattern for route handlers. To maintain both type safety and authentication while following Next.js's requirements, we use the following pattern:

```typescript
// lib/api.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/config';

/**
 * Helper function to handle authentication for route handlers
 */
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, session: any) => Promise<Response>
): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    return handler(request, session);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * Common response helpers
 */
export const jsonResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (message: string, status = 500) => {
  return new NextResponse(message, { status });
};
```

### Usage in Route Handlers

For dynamic routes (e.g., `app/api/[id]/route.ts`), use this pattern:

```typescript
import { NextRequest } from 'next/server';
import * as db from '../../../lib/db';
import { withAuth, jsonResponse, errorResponse } from '../../../lib/api';

function getSingleId(id: string | string[] | undefined): string | undefined {
  if (!id) return undefined;
  return Array.isArray(id) ? id[0] : id;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse('Bad Request', 400);
    }

    const result = await db.findById('YourModel', id);
    if (!result) {
      return errorResponse('Not Found', 404);
    }

    return jsonResponse(result);
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse('Bad Request', 400);
    }

    const body = await req.json();
    const result = await db.updateById('YourModel', id, body);
    if (!result) {
      return errorResponse('Internal Error', 500);
    }

    return jsonResponse(result);
  });
}
```

### Important Notes

1. Always export route handlers directly (GET, PUT, POST, DELETE) - do not wrap them in higher-order functions
2. Use the exact Next.js types for route handlers:
   - `NextRequest` for the request parameter
   - `{ params: { id: string } }` for dynamic route parameters
3. Use the `withAuth` helper inside the route handler to maintain authentication
4. Use the provided response helpers (`jsonResponse`, `errorResponse`) for consistent responses

This pattern ensures:
- Type safety through Next.js's built-in types
- Proper authentication via NextAuth.js
- Consistency with Next.js App Router expectations
- Clean error handling and response formatting

## Production Infrastructure

### System Layout

```
/home/bish/Downloads/
├── config/
│   ├── setup-production.sh    # Main deployment script
│   ├── ecosystem.config.js    # PM2 process configuration
│   └── nginx/
│       └── sites-available/   # Nginx site configurations
│           └── crm.myinvoices.today
└── sites/
    └── crm-platform/         # Application code (port 3100)
```

### Nginx Configuration

The CRM platform uses a multi-layered nginx configuration:

> ⚠️ **IMPORTANT: Always use setup-production.sh for deployment**
> ```bash
> cd /home/bish/Downloads/config
> ./setup-production.sh crm-platform
> ```
> This ensures proper port management (3100) and process handling.

1. SSL/TLS Setup:
   ```nginx
   ssl_protocols TLSv1.2 TLSv1.3;
   ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:...;
   ssl_prefer_server_ciphers off;
   ssl_session_timeout 1d;
   ssl_session_cache shared:SSL:50m;
   ```

2. Security Headers:
   ```nginx
   add_header Strict-Transport-Security "max-age=63072000" always;
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-XSS-Protection "1; mode=block" always;
   add_header X-Content-Type-Options "nosniff" always;
   ```

3. Next.js Integration:
   ```nginx
   # Static files with basePath
   location /crm/_next/static {
       proxy_pass http://localhost:3100/_next/static;
       expires 365d;
       add_header Cache-Control "public, max-age=31536000, immutable";
   }

   # Application routes
   location /crm {
       proxy_pass http://localhost:3100;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
   }
   ```

4. Error Page Handling:
   ```nginx
   # Error pages with animations
   error_page 404 /error_pages/404.html;
   error_page 500 502 503 504 /error_pages/50x.html;

   # Dedicated location block for error pages
   location ^~ /error_pages/ {
       root /etc/nginx;
       internal;
       try_files $uri =404;
       add_header Cache-Control "no-store, no-cache, must-revalidate";
   }
   ```
   - Static error pages in `/etc/nginx/error_pages/`
   - No JavaScript dependencies for reliability
   - Auto-refresh enabled for maintenance page
   - Automatic recovery when service restores

### PM2 Ecosystem

The application runs under PM2 process management with specific configurations:

1. Process Configuration:
   ```javascript
   module.exports = {
     apps: [{
       name: 'crm-platform',
       script: 'server.js',
       instances: 1,
       port: 3100,
       env_production: {
         NODE_ENV: 'production',
         PORT: 3100
       }
     }]
   }
   ```

2. Memory Management:
   - Production memory limit: 200MB
   - Restart on memory exceed
   - Log rotation enabled

3. Health Monitoring:
   - Automatic restart on failure
   - HTTP health checks
   - Error logging and monitoring

### Deployment Process

1. Configuration Verification:
   ```bash
   # Check nginx config
   sudo nginx -t
   
   # Verify PM2 ecosystem
   cat /home/bish/Downloads/config/ecosystem.config.js
   ```

2. SSL Certificate Management:
   ```bash
   # Generate new certificate
   cd /home/bish/Downloads/sites/crm-platform
   node scripts/generate-ssl.js
   
   # Verify certificate
   openssl x509 -in ssl/certificate.crt -text
   ```

3. Production Deployment:
   ```bash
   cd /home/bish/Downloads/config
   ./setup-production.sh crm-platform
   ```

### Maintenance

1. Log Management:
   - Nginx logs: `/var/log/nginx/`
   - PM2 logs: `pm2 logs crm-platform`
   - Application logs: `/home/bish/Downloads/sites/crm-platform/logs/`

2. Monitoring:
   - Process status: `pm2 list`
   - Resource usage: `pm2 monit`
   - SSL expiry: `openssl x509 -enddate -noout -in ssl/certificate.crt`

3. Backup Strategy:
   - Automatic backups before deployment
   - Backup rotation (keep last 5)
   - Database dumps included in backups
