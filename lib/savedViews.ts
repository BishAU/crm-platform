import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface Filter {
  column: string;
  operator: 'contains' | 'notContains' | 'equals' | 'notEquals' | 'startsWith' | 'endsWith';
  value: string;
}

export interface SavedViewInput {
  name: string;
  entityType: string;
  userId: string;
  filters: Filter[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface SavedViewData {
  id: string;
  name: string;
  entityType: string;
  userId: string;
  filters: Filter[];
  sortColumn: string | null;
  sortDirection: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function saveView(view: SavedViewInput): Promise<SavedViewData> {
  const result = await prisma.$queryRaw`
    INSERT INTO saved_views (
      name,
      entity_type,
      user_id,
      filters,
      sort_column,
      sort_direction
    ) VALUES (
      ${view.name},
      ${view.entityType},
      ${view.userId},
      ${JSON.stringify(view.filters)}::jsonb,
      ${view.sortColumn},
      ${view.sortDirection}
    )
    RETURNING *;
  `;

  const savedView = Array.isArray(result) ? result[0] : result;
  return {
    ...savedView,
    filters: JSON.parse(savedView.filters as string) as Filter[],
    entityType: savedView.entity_type,
    userId: savedView.user_id,
    sortColumn: savedView.sort_column,
    sortDirection: savedView.sort_direction,
  };
}

export async function getSavedViews(entityType: string, userId: string): Promise<SavedViewData[]> {
  const results = await prisma.$queryRaw`
    SELECT * FROM saved_views
    WHERE entity_type = ${entityType}
    AND user_id = ${userId}
    ORDER BY name ASC;
  `;

  return (results as any[]).map(view => ({
    ...view,
    filters: JSON.parse(view.filters as string) as Filter[],
    entityType: view.entity_type,
    userId: view.user_id,
    sortColumn: view.sort_column,
    sortDirection: view.sort_direction,
  }));
}

export async function deleteSavedView(id: string, userId: string): Promise<void> {
  await prisma.$executeRaw`
    DELETE FROM saved_views
    WHERE id = ${id}
    AND user_id = ${userId};
  `;
}

export function buildWhereClause<T extends Record<string, any>>(filters: Filter[]): Prisma.JsonObject {
  return filters.reduce<Prisma.JsonObject>((acc, filter) => {
    const value = filter.value;
    switch (filter.operator) {
      case 'contains':
        return { ...acc, [filter.column]: { contains: value, mode: 'insensitive' } };
      case 'notContains':
        return { ...acc, [filter.column]: { not: { contains: value, mode: 'insensitive' } } };
      case 'equals':
        return { ...acc, [filter.column]: { equals: value } };
      case 'notEquals':
        return { ...acc, [filter.column]: { not: { equals: value } } };
      case 'startsWith':
        return { ...acc, [filter.column]: { startsWith: value, mode: 'insensitive' } };
      case 'endsWith':
        return { ...acc, [filter.column]: { endsWith: value, mode: 'insensitive' } };
      default:
        return acc;
    }
  }, {});
}

export function applySavedView<T extends Record<string, any>>(view: SavedViewInput): {
  where: Prisma.JsonObject;
  orderBy?: { [key: string]: string };
} {
  const whereClause = buildWhereClause<T>(view.filters);
  const orderBy = view.sortColumn && view.sortDirection
    ? { [view.sortColumn]: view.sortDirection }
    : undefined;

  return {
    where: whereClause,
    orderBy,
  };
}
