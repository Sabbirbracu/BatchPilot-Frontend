// Thin client for the FastAPI backend. All calls are same-origin (/api/v1/...) and
// carry the HttpOnly session cookie automatically.

export type ApiErrorBody = {
  code: string;
  message_bn: string;
  message_en: string;
  field?: string | null;
};

export class ApiError extends Error {
  status: number;
  code: string;
  messageBn: string;
  messageEn: string;
  field?: string | null;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message_en);
    this.status = status;
    this.code = body.code;
    this.messageBn = body.message_bn;
    this.messageEn = body.message_en;
    this.field = body.field;
  }
}

type Options = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
};

export async function api<T>(path: string, opts: Options = {}): Promise<T> {
  const url = new URL(`/api/v1${path}`, window.location.origin);
  for (const [k, v] of Object.entries(opts.params ?? {})) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }
  let res: Response;
  try {
    res = await fetch(url, {
      method: opts.method ?? (opts.body ? "POST" : "GET"),
      credentials: "same-origin",
      headers: {
        ...(opts.body ? { "Content-Type": "application/json" } : {}),
        ...opts.headers,
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError(0, {
      code: "network",
      message_bn: "ইন্টারনেট সংযোগ নেই। আবার চেষ্টা করুন।",
      message_en: "No connection. Please try again.",
    });
  }
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data?.code
        ? data
        : { code: "server_error", message_bn: "সার্ভারে সমস্যা হয়েছে", message_en: "Server error" },
    );
  }
  return data as T;
}

/** Client-generated key so a retried payment on bad mobile data is never counted twice. */
export function newIdempotencyKey(): string {
  return crypto.randomUUID();
}
