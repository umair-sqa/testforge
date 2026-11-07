import type { APIRequestContext, APIResponse } from '@playwright/test';

type RequestOptions = NonNullable<Parameters<APIRequestContext['get']>[1]>;

/** Thin typed HTTP wrapper. Keep application-specific endpoints in domain clients. */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private endpoint(path: string): string {
    return path.replace(/^\/+/, '');
  }

  get(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.get(this.endpoint(path), options);
  }

  post(path: string, data?: unknown, options?: Omit<RequestOptions, 'data'>): Promise<APIResponse> {
    return this.request.post(this.endpoint(path), { ...options, data });
  }

  put(path: string, data?: unknown, options?: Omit<RequestOptions, 'data'>): Promise<APIResponse> {
    return this.request.put(this.endpoint(path), { ...options, data });
  }

  patch(
    path: string,
    data?: unknown,
    options?: Omit<RequestOptions, 'data'>,
  ): Promise<APIResponse> {
    return this.request.patch(this.endpoint(path), { ...options, data });
  }

  delete(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.request.delete(this.endpoint(path), options);
  }
}
