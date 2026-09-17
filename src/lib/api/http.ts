import { API_BASE_URL, API_TIMEOUT_MS } from './config';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly path: string,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type QueryValue = string | number | boolean | undefined | null;

export function buildQuery(params: Record<string, QueryValue> = {}): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: Record<string, QueryValue>;
  body?: unknown;
  /** Seconds of ISR caching for server-rendered requests. */
  revalidate?: number;
  /** Cache tags, so the backend can purge a single product on publish. */
  tags?: string[];
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

/**
 * Single fetch wrapper for the whole application.
 * Adds timeout, JSON handling, Next.js cache hints and typed errors.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', params, body, revalidate, tags, headers = {}, signal } = options;

  if (!API_BASE_URL) {
    throw new ApiError('API base URL is not configured', 0, path);
  }

  const url = `${API_BASE_URL}${path}${buildQuery(params)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  if (signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...(method === 'GET'
        ? { next: { revalidate: revalidate ?? 300, ...(tags ? { tags } : {}) } }
        : { cache: 'no-store' as const }),
    });

    const isJson = (response.headers.get('content-type') ?? '').includes('application/json');
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new ApiError(
        typeof payload === 'object' && payload && 'detail' in payload
          ? String((payload as { detail: unknown }).detail)
          : `Request failed with status ${response.status}`,
        response.status,
        path,
        payload,
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out', 408, path);
    }
    throw new ApiError((error as Error).message || 'Network error', 0, path);
  } finally {
    clearTimeout(timeout);
  }
}
