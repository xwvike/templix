export interface RequestOptions {
  loading?: boolean;
  retry?: number;
  retryDelay?: number;
  withToken?: boolean;
  errorMessage?: boolean;
  successMessage?: boolean;
}

export interface HttpResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface ResponseError extends Error {
  code?: number;
  config?: any;
  response?: any;
}