/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-types */

// These type definitions are based on the Jest documentation:
// https://jestjs.io/docs/en/expect

declare var describe: {
  (name: string, fn: () => void): void;
  only: (name: string, fn: () => void) => void;
  skip: (name: string, fn: () => void) => void;
};

declare var it: {
  (name: string, fn: (done: () => void) => void | Promise<void>): void;
  only: (name: string, fn: (done: () => void) => void | Promise<void>) => void;
  skip: (name: string, fn: (done: () => void) => void | Promise<void>) => void;
};

declare var test: typeof it;

declare var beforeAll: (
  fn: (done: () => void) => void | Promise<void>,
  timeout?: number
) => void;
declare var beforeEach: (
  fn: (done: () => void) => void | Promise<void>,
  timeout?: number
) => void;
declare var afterAll: (
  fn: (done: () => void) => void | Promise<void>,
  timeout?: number
) => void;
declare var afterEach: (
  fn: (done: () => void) => void | Promise<void>,
  timeout?: number
) => void;

declare var expect: {
  <T = any>(actual: T): Expect<T>;
  extend: (matchers: Record<string, Function>) => void;
  anything: () => any;
  any: (constructor: any) => any;
  arrayContaining: <T>(array: T[]) => T[];
  objectContaining: <T>(object: T) => T;
  stringContaining: (string: string) => string;
  stringMatching: (regexp: RegExp) => string;
  assertions: (number: number) => void;
  hasAssertions: () => void;
  addSnapshotSerializer: (serializer: any) => void;
  not: {
    <T = any>(actual: T): Expect<T>;
  };
};

interface Expect<T = any> {
  not: Expect<T>;
  resolves: Expect<T>;
  rejects: Expect<T>;
  toBe(expected: T): void;
  toEqual(expected: T): void;
  toThrow(error?: string | Function | RegExp): void;
  toThrowError(error?: string | Function | RegExp): void;
  toBeInstanceOf(constructor: any): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeDefined(): void;
  toBeUndefined(): void;
  toBeNull(): void;
  toBeNaN(): void;
  toContain(item: any): void;
  toContainEqual(item: any): void;
  toHaveLength(length: number): void;
  toHaveProperty(keyPath: string | any[], value?: any): void;
  toBeCloseTo(expected: number, precision?: number): void;
  toBeGreaterThan(expected: number): void;
  toBeGreaterThanOrEqual(expected: number): void;
  toBeLessThan(expected: number): void;
  toBeLessThanOrEqual(expected: number): void;
  toMatch(expected: string | RegExp): void;
  toMatchObject(expected: any): void;
  toStrictEqual(expected: T): void;
  toMatchSnapshot(hint?: string): void;
  toMatchInlineSnapshot(snapshot?: string): void;
  toThrowErrorMatchingSnapshot(): void;
  toThrowErrorMatchingInlineSnapshot(snapshot?: string): void;
  // Add @testing-library/jest-dom matchers
  toBeInTheDocument(): void;
  toBeDisabled(): void;
  toBeEnabled(): void;
  toBeEmpty(): void;
  toBeEmptyDOMElement(): void;
  toBeInvalid(): void;
  toBeRequired(): void;
  toBeValid(): void;
  toBeVisible(): void;
  toContainElement(element: HTMLElement | null): void;
  toContainHTML(htmlText: string): void;
  toHaveAttribute(attr: string, value?: string): void;
  toHaveClass(...classNames: string[]): void;
  toHaveFocus(): void;
  toHaveFormValues(expectedValues: { [key: string]: any }): void;
  toHaveStyle(css: string | { [key: string]: any }): void;
  toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): void;
  toHaveValue(value?: string | string[] | number): void;
  toBeChecked(): void;
  toHaveBeenCalledWith(...args: any[]): void;
}