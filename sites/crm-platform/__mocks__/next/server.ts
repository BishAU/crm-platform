class MockResponse {
  private bodyContent: any;
  private options: ResponseInit;
  private headers: Headers;

  constructor(body?: any, init: ResponseInit = {}) {
    this.bodyContent = body;
    this.options = init;
    this.headers = new Headers(init.headers || {});
  }

  get status() {
    return this.options.status || 200;
  }

  get contentType() {
    return this.headers.get('content-type') || 'application/json';
  }

  getHeaders() {
    return this.headers;
  }

  async text() {
    if (typeof this.bodyContent === 'string') {
      return this.bodyContent;
    }
    return this.contentType === 'application/json' 
      ? JSON.stringify(this.bodyContent)
      : String(this.bodyContent);
  }

  async json() {
    if (this.contentType !== 'application/json') {
      throw new Error(`Invalid content type: ${this.contentType}`);
    }
    return this.bodyContent;
  }
}

export class NextResponse extends MockResponse {
  constructor(body?: any, init?: ResponseInit) {
    super(body, init);
    Object.setPrototypeOf(this, NextResponse.prototype);
  }

  static json(data: any, init?: ResponseInit) {
    const headers = new Headers(init?.headers);
    headers.set('content-type', 'application/json');
    
    return new NextResponse(data, {
      ...init,
      headers
    });
  }
}

export class NextRequest {
  readonly nextUrl: URL;
  private bodyContent: string | null;
  readonly method: string;
  readonly headers: Headers;
  
  constructor(input: string | URL, init: RequestInit = {}) {
    this.nextUrl = new URL(input.toString());
    this.bodyContent = init.body?.toString() || null;
    this.method = init.method || 'GET';
    this.headers = new Headers(init.headers);
  }

  async text() {
    return this.bodyContent || '';
  }

  async json() {
    if (!this.bodyContent) return undefined;
    try {
      return JSON.parse(this.bodyContent);
    } catch (e) {
      throw new Error(`Invalid JSON in request body: ${this.bodyContent}`);
    }
  }
}

export const { json } = NextResponse;