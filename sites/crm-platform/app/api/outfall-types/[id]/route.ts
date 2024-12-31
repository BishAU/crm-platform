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

    const outfallType = await db.findById('OutfallType', id);

    if (!outfallType) {
      return errorResponse(ERROR_MESSAGES.NOT_FOUND('Outfall type'), 404);
    }

    return jsonResponse(outfallType);
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
    const updatedOutfallType = await db.updateById('OutfallType', id, body);

    if (!updatedOutfallType) {
      return errorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 500);
    }

    return jsonResponse(updatedOutfallType);
  });
}
