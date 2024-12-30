import { prisma } from './prisma';
import { NextResponse } from 'next/server';

// Add any database utility functions here
export async function findById(model: string, id: string) {
  try {
    const result = await (prisma as any)[model].findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error(`Error finding ${model} by ID:`, error);
    return null;
  }
}

export async function updateById(model: string, id: string, data: any) {
  try {
    const result = await (prisma as any)[model].update({
      where: { id },
      data,
    });
    return result;
  } catch (error) {
    console.error(`Error updating ${model} by ID:`, error);
    return null;
  }
}