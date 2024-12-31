import { NextRequest } from 'next/server';
import * as db from '@lib/db';
import { withAuth, jsonResponse, errorResponse, ERROR_MESSAGES } from '../../../lib/api';

function getSingleId(id: string | string[] | undefined): string | undefined {
  if (!id) return undefined;
  return Array.isArray(id) ? id[0] : id;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { [key: string]: string | string[] } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse(ERROR_MESSAGES.BAD_REQUEST, 400);
    }

    const person = await db.findById('Person', id);

    if (!person) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Person'), 404);
    }

    return jsonResponse(person);
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { [key: string]: string | string[] } }
) {
  return withAuth(request, async (req, session) => {
    const id = getSingleId(params.id);
    if (!id) {
      return errorResponse(ERROR_MESSAGES.BAD_REQUEST, 400);
    }

    const body = await request.json();
    const updatedPerson = await db.updateById('Person', id, body);

    if (!updatedPerson) {
      return errorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 500);
    }

    return jsonResponse(updatedPerson);
  });
}
