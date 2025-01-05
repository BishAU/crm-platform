import { NextRequest, NextResponse } from 'next/server';
import { getSavedViews, saveView } from '../../../lib/savedViews';

// Since we're not using auth, we'll use a default user ID
const DEFAULT_USER_ID = '1';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');

    if (!entityType) {
      return NextResponse.json({ error: 'Entity type is required' }, { status: 400 });
    }

    const views = await getSavedViews(entityType, DEFAULT_USER_ID);
    return NextResponse.json(views);
  } catch (error) {
    console.error('Error fetching saved views:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const view = await saveView({
      ...data,
      userId: DEFAULT_USER_ID,
    });

    return NextResponse.json(view);
  } catch (error) {
    console.error('Error saving view:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
