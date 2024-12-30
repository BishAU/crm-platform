import { prisma } from './prisma';

export async function findById(table: string, id: string, include?: string[]) {
  const result = await prisma.$queryRaw`
    SELECT * FROM "${table}" WHERE id = ${id}
  `;
  
  if (!Array.isArray(result) || !result[0]) return null;
  let record = result[0];

  if (include?.length) {
    const relatedData = await Promise.all(
      include.map(async (relation) => {
        const related = await prisma.$queryRaw`
          SELECT * FROM "${relation}"
          WHERE "${table.toLowerCase()}Id" = ${id}
        `;
        return { [relation]: Array.isArray(related) ? related : [] };
      })
    );

    record = {
      ...record,
      ...Object.assign({}, ...relatedData)
    };
  }

  return record;
}

export async function updateById(
  table: string,
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

  return prisma.$transaction(async (tx) => {
    // Update each field individually to maintain type safety
    for (const [key, value] of Object.entries(mappedData)) {
      if (value !== undefined) {
        await tx.$executeRaw`
          UPDATE "${table}"
          SET "${key}" = ${value === null ? null : value}
          WHERE id = ${id}
        `;
      }
    }

    // Update timestamp
    await tx.$executeRaw`
      UPDATE "${table}"
      SET "updatedAt" = NOW()
      WHERE id = ${id}
    `;

    // Handle relations if any
    if (options?.relations) {
      for (const relation of options.relations) {
        // Delete existing relations
        await tx.$executeRaw`
          DELETE FROM "${relation.table}"
          WHERE "${table.toLowerCase()}Id" = ${id}
        `;

        // Insert new relations one by one
        for (const item of relation.data) {
          for (const [key, value] of Object.entries(item)) {
            await tx.$executeRaw`
              INSERT INTO "${relation.table}" ("${table.toLowerCase()}Id", "${key}")
              VALUES (${id}, ${value})
            `;
          }
        }
      }
    }

    // Fetch updated record with relations
    return findById(table, id, options?.relations?.map(r => r.table));
  });
}

export async function findByEmail(table: string, email: string, excludeId?: string) {
  const result = excludeId
    ? await prisma.$queryRaw`
        SELECT id FROM "${table}" 
        WHERE email = ${email} AND id != ${excludeId}
      `
    : await prisma.$queryRaw`
        SELECT id FROM "${table}" 
        WHERE email = ${email}
      `;

  return Array.isArray(result) ? result[0] : null;
}

export async function findByName(table: string, name: string, excludeId?: string) {
  const result = excludeId
    ? await prisma.$queryRaw`
        SELECT id FROM "${table}" 
        WHERE name = ${name} AND id != ${excludeId}
      `
    : await prisma.$queryRaw`
        SELECT id FROM "${table}" 
        WHERE name = ${name}
      `;

  return Array.isArray(result) ? result[0] : null;
}