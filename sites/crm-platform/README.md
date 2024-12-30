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