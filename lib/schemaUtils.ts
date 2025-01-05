import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface PrismaModelField {
  name: string;
  type: string;
  isOptional: boolean;
  hasDefaultValue: boolean;
  isId: boolean;
  relationName?: string;
}

export interface PrismaModel {
  name: string;
  fields: PrismaModelField[];
}

// Helper to get model metadata from Prisma
export function getPrismaModelMetadata(modelName: string): PrismaModel | undefined {
  const dmmf = (Prisma as any).dmmf;
  return dmmf.datamodel.models.find((model: PrismaModel) => model.name === modelName);
}

// Get required fields for a model
export function getRequiredFields(modelName: string): string[] {
  const model = getPrismaModelMetadata(modelName);
  if (!model) return [];

  return model.fields
    .filter((field: PrismaModelField) => {
      // Field is required if:
      // 1. It's not optional (@optional in schema)
      // 2. It doesn't have a default value
      // 3. It's not an auto-generated id field
      // 4. It's not a relation field
      return !field.isOptional && 
             !field.hasDefaultValue && 
             !field.isId &&
             !field.relationName;
    })
    .map((field: PrismaModelField) => field.name);
}

// Get field types for a model
export function getFieldTypes(modelName: string): Record<string, string> {
  const model = getPrismaModelMetadata(modelName);
  if (!model) return {};

  return model.fields.reduce((acc: Record<string, string>, field: PrismaModelField) => {
    acc[field.name] = field.type;
    return acc;
  }, {});
}

// Validate a value against a Prisma type
export function validateFieldValue(value: any, type: string): ValidationResult {
  if (value === null || value === undefined) {
    return { isValid: false, error: 'Value is required' };
  }

  try {
    switch (type.toLowerCase()) {
      case 'int':
        if (isNaN(parseInt(value))) {
          return { isValid: false, error: 'Expected an integer' };
        }
        break;
      case 'float':
      case 'decimal':
        if (isNaN(parseFloat(value))) {
          return { isValid: false, error: 'Expected a number' };
        }
        break;
      case 'datetime':
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          return { isValid: false, error: 'Expected a valid date' };
        }
        break;
      case 'boolean':
        if (typeof value !== 'boolean' && !['true', 'false', '0', '1'].includes(value.toLowerCase())) {
          return { isValid: false, error: 'Expected a boolean value' };
        }
        break;
      case 'string':
        if (typeof value !== 'string') {
          return { isValid: false, error: 'Expected a string' };
        }
        break;
    }
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid value for type ' + type };
  }
}

// Get all importable models
export function getImportableModels(): string[] {
  const dmmf = (Prisma as any).dmmf;
  return dmmf.datamodel.models
    .filter((model: PrismaModel) => {
      // Filter out internal models or those that shouldn't be imported
      const excludedModels = ['Session', 'VerificationToken', 'Account'];
      return !excludedModels.includes(model.name);
    })
    .map((model: PrismaModel) => model.name);
}