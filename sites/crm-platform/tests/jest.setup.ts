import '@testing-library/jest-dom';
import { NextRequest } from 'next/server';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';
import './jest.d';

// Mock Next.js Request/Response
const createMockRequest = (url: string, options: { method?: string; body?: string; headers?: Record<string, string> } = {}) => {
  const baseUrl = 'http://localhost:3000';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  // Create a minimal mock request
  const req = new NextRequest(fullUrl, {
    method: options.method || 'GET',
    headers: options.headers || {},
    body: options.body
  });

  // Add json method if body is provided
  if (options.body) {
    const parsedBody = JSON.parse(options.body);
    req.json = jest.fn().mockResolvedValue(parsedBody);
  }

  return req;
};

// Set up web API globals
Object.assign(global, {
  fetch,
  Headers: global.Headers,
  Request: global.Request,
  Response: global.Response,
  URL: global.URL,
  TextEncoder,
  TextDecoder
});

// Export helper for creating mock requests
export { createMockRequest };