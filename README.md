# CRM Platform

This is a CRM platform built with Next.js, Prisma, and PostgreSQL.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Authentication Setup](#authentication-setup)
3. [API Route Organization](#api-route-organization)
4. [Database Configuration](#database-configuration)
5. [Environment Variables](#environment-variables)
6. [Development Setup](#development-setup)
7. [Deployment Instructions](#deployment-instructions)
8. [Testing Information](#testing-information)
9. [Import Methodology](#import-methodology)
10. [Database Schema](#database-schema)
11. [Nginx Configuration](#nginx-configuration)
12. [SendGrid Integration](#sendgrid-integration)

## Project Overview
The CRM Platform is a comprehensive customer relationship management system designed to manage various entities including:
- Facilities
- Observations
- People
- Politicians
- Water Authorities
- Indigenous Communities

The platform features:
- Role-based authentication
- RESTful API endpoints
- CSV data import functionality
- Customizable data schemas
- Reporting and analytics

## Authentication Setup
Authentication is handled using NextAuth.js with the following configuration:
- Credentials-based authentication
- JWT session strategy
- Protected routes defined in middleware
- Login page at `/login`

Key authentication files:
- `middleware.ts` - Route protection configuration
- `lib/auth.ts` - Authentication providers and session management

## API Route Organization
The API follows RESTful conventions with routes organized by resource type:
```
app/api/
├── auth/              # Authentication endpoints
├── facilities/        # Facility management
├── observations/      # Observation tracking
├── people/            # Person records
├── politicians/       # Politician information
├── water-authorities/ # Water authority data
└── ...                # Other resource types
```

Each resource type has:
- Collection endpoints (e.g., GET /api/facilities)
- Individual resource endpoints (e.g., GET /api/facilities/[id])
- Specialized operation endpoints (e.g., POST /api/import/process)

## Database Configuration
The platform uses PostgreSQL with Prisma ORM:
- Database connection configured via DATABASE_URL in .env
- Prisma schema located at `prisma/schema.prisma`
- Database migrations managed through Prisma Migrate

## Environment Variables
Required environment variables:
```
NEXTAUTH_URL=https://crm.myinvoices.today
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://user:password@host:port/database
SENDGRID_API_KEY=your-sendgrid-key
```

Additional environment variables:
```
# Import Configuration
IMPORT_BATCH_SIZE=1000
IMPORT_MAX_RETRIES=3
IMPORT_RETRY_DELAY=5000

# Nginx Configuration
NGINX_PORT=80
NGINX_SSL_PORT=443
NGINX_MAX_BODY_SIZE=100M

# Rate Limiting
RATE_LIMIT_WINDOW=60
RATE_LIMIT_MAX=1000
```

## Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run database migrations: `npx prisma migrate dev`
5. Start development server: `npm run dev`

## Deployment Instructions
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure reverse proxy (Nginx configs provided in `nginx/`)

## Testing Information
The project includes Jest tests located in the `tests/` directory. Run tests with:
```bash
npm test
```

Key test files:
- `tests/dashboard.test.tsx` - Dashboard component tests
- `tests/api/` - API endpoint tests

## Import Methodology
The platform supports bulk data import through CSV files. The import process follows these steps:

1. **File Validation**
   - Validate CSV structure against expected schema
   - Check required fields and data types
   - Verify file size and row count limits

2. **Data Processing**
   - Parse CSV using fast-csv
   - Transform data to match database schema
   - Handle special cases (e.g., date formats, null values)

3. **Database Operations**
   - Use Prisma transactions for atomic operations
   - Batch inserts for performance
   - Handle duplicate detection and conflict resolution

4. **Error Handling**
   - Detailed error logging
   - Retry mechanism for transient failures
   - Partial success reporting

Key import files:
- `app/api/import/route.ts` - Main import endpoint
- `lib/importUtils.ts` - Import utilities
- `scripts/import-csv-data.js` - CLI import script

## Database Schema
The database schema is defined in `prisma/schema.prisma` and includes the following key models:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Facility {
  id          Int      @id @default(autoincrement())
  name        String
  type        FacilityType
  location    String
  observations Observation[]
}

model Observation {
  id          Int      @id @default(autoincrement())
  facilityId  Int
  facility    Facility @relation(fields: [facilityId], references: [id])
  recordedAt  DateTime
  values      Json
}
```

Key relationships:
- One-to-many: Facility → Observations
- Many-to-many: Users → Roles
- Polymorphic: Notes → Various entities

## Nginx Configuration
The platform includes two Nginx configurations:

1. **Production Configuration** (`nginx/crm.conf`)
```nginx
server {
    listen 80;
    server_name crm.myinvoices.today;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 100M;
}
```

2. **Maintenance Configuration** (`nginx/crm-offline.conf`)
```nginx
server {
    listen 80;
    server_name crm.myinvoices.today;

    location / {
        root /var/www/crm/maintenance;
        try_files $uri /index.html;
    }
}
```

Key features:
- Reverse proxy to Node.js application
- SSL termination (when configured)
- Rate limiting
- Request size limits
- Maintenance mode support

## SendGrid Integration
The platform integrates with SendGrid for email templates and campaigns. To access SendGrid templates:

1. **Configuration**
   - Ensure SENDGRID_API_KEY is set in .env
   - Add the following environment variables:
     ```
     SENDGRID_TEMPLATES_ENDPOINT=https://api.sendgrid.com/v3/templates
     SENDGRID_TEMPLATE_VERSION=1
     ```

2. **Accessing Templates**
   - Visit `/marketing/templates` in your browser
   - The page will automatically fetch available templates from SendGrid
   - Templates are cached for 1 hour to improve performance

3. **Template Management**
   - Create and manage templates directly in SendGrid
   - Changes are automatically reflected in the CRM
   - Use template IDs in your email campaigns

4. **Security**
   - Template access requires authentication
   - API keys are securely stored
   - Rate limiting is applied to prevent abuse

Key files:
- `app/api/sendgrid/route.ts` - SendGrid API proxy
- `app/marketing/templates/page.tsx` - Template listing page
- `lib/sendgrid.ts` - SendGrid utilities
