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
13. [API Response Patterns](#api-response-patterns)

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
├── people/           # Person records
├── politicians/      # Politician information
├── water-authorities/ # Water authority data
└── ...               # Other resource types
```

Each resource type has:
- Collection endpoints (e.g., GET /api/facilities)
- Individual resource endpoints (e.g., GET /api/facilities/[id])
- Specialized operation endpoints (e.g., POST /api/import/process)

## API Response Patterns
The API follows consistent response patterns across all endpoints:

### Count Endpoints
When requesting counts (?count=true), all endpoints return:
```json
{
  "count": number
}
```

### List Endpoints
For paginated lists, endpoints return:
```json
{
  "items": Array<T>,
  "page": number,
  "totalPages": number,
  "totalItems": number
}
```

### Error Responses
All error responses follow:
```json
{
  "error": string,
  "details": string (optional)
}
```

### Import Responses
Import endpoints return detailed results:
```json
{
  "importedCount": number,
  "totalRecords": number,
  "validRecords": number,
  "invalidRecords": number,
  "skippedRecords": Array<{
    "row": number,
    "missingFields": string[]
  }> (optional)
}
```

## Import Methodology
The platform supports bulk data import through CSV files. The import process follows these steps:

1. **File Analysis**
   - Analyze CSV structure using `POST /api/import/analyze-csv`
   - Match CSV headers with database schema
   - Validate data types and required fields
   - Return available mappings and field requirements

2. **Data Validation**
   - Validate CSV structure against expected schema
   - Check required fields and data types
   - Handle special cases:
     - Convert empty strings to null
     - Parse boolean values ("true"/"false", "yes"/"no")
     - Convert numeric strings to numbers
     - Handle latitude/longitude as strings
     - Validate foreign key relationships

3. **Import Process**
   - Process records in batches (100 records per batch)
   - Skip duplicate records using `skipDuplicates: true`
   - Track successful and failed imports
   - Handle partial success scenarios
   - Provide detailed error reporting

4. **Error Handling**
   - Track invalid records with row numbers
   - Report missing required fields
   - Handle database constraints:
     - P2002: Unique constraint violations
     - P2003: Foreign key constraint failures
     - P2005: Invalid field values
   - Support partial imports with 207 Multi-Status responses

Key import files:
- `app/api/import/route.ts` - Main import endpoint
- `app/api/import/analyze-csv/route.ts` - CSV analysis endpoint
- `scripts/import-csv-data.js` - CLI import script

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

## Database Schema
The database schema is defined in `prisma/schema.prisma` and includes proper relationships between models. Key relationships:
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
