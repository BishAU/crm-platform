
import { prisma as prismaClient } from '../app/lib/prisma';
export const prisma = prismaClient;
import { Prisma, PrismaClient } from '@prisma/client';

type PrismaModels = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { findUnique: any }
    ? K
    : never;
}[keyof PrismaClient];

type ModelName = Uncapitalize<PrismaModels>;

export async function findById(table: ModelName, id: string, include?: string[]) {
  const includeObj = include?.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
  return (prisma[table] as any).findUnique({
    where: { id },
    include: includeObj
  });
}

export async function updateById(
  table: ModelName,
  id: string,
  data: Record<string, any>,
  options?: {
    fieldMap?: Record<string, string>;
    relations?: {
      table: string;
      data: Record<string, any>[];
    }[];
  }
) {
  // Handle field mapping
  const mappedData = { ...data };
  if (options?.fieldMap) {
    Object.entries(options.fieldMap).forEach(([from, to]) => {
      if (from in mappedData) {
        mappedData[to] = mappedData[from];
        delete mappedData[from];
      }
    });
  }

  const includeObj = options?.relations?.reduce(
    (acc, curr) => ({ ...acc, [curr.table]: true }),
    {}
  );

  return (prisma[table] as any).update({
    where: { id },
    data: {
      ...mappedData,
      updatedAt: new Date(),
      ...(options?.relations
        ? options.relations.reduce((acc, relation) => ({
            ...acc,
            [relation.table]: {
              deleteMany: {},
              create: relation.data
            }
          }), {})
        : {})
    },
    include: includeObj
  });
}

export async function findByEmail(table: ModelName, email: string, excludeId?: string) {
  return (prisma[table] as any).findFirst({
    where: {
      email,
      ...(excludeId ? { NOT: { id: excludeId } } : {})
    },
    select: { id: true }
  });
}

export async function findByName(table: ModelName, name: string, excludeId?: string) {
  return (prisma[table] as any).findFirst({
    where: {
      name,
      ...(excludeId ? { NOT: { id: excludeId } } : {})
    },
    select: { id: true }
  });
}

export async function findMany(
  table: ModelName,
  options?: {
    include?: string[];
    where?: Record<string, any>;
    orderBy?: Record<string, 'asc' | 'desc'>;
    take?: number;
  }
) {
  const includeObj = options?.include?.reduce(
    (acc, curr) => ({ ...acc, [curr]: true }),
    {}
  );

  return (prisma[table] as any).findMany({
    where: options?.where,
    include: includeObj,
    orderBy: options?.orderBy,
    take: options?.take
  });
}

export async function create(
  table: ModelName,
  options: {
    data: Record<string, any>;
    include?: string[];
  }
) {
  const includeObj = options?.include?.reduce(
    (acc, curr) => ({ ...acc, [curr]: true }),
    {}
  );

  return (prisma[table] as any).create({
    data: options.data,
    include: includeObj
  });
}
