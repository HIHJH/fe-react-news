import { httpClient } from "./newsClient";
import type { Endpoint, Method, Response } from "./api";

// Path Parameter 추출을 위한 유틸리티 타입
type ExtractParams<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

// Path Parameter가 있으면 params 객체를 요구하고, 없으면 생략 가능하게 함
type RequestArgs<T extends Endpoint> = ExtractParams<T> extends never
  ? [params?: undefined, body?: unknown]
  : [params: Record<ExtractParams<T>, string | number>, body?: unknown];

/**
 * 타입 안전한 API 요청 함수
 * @param method HTTP Method (GET, POST, DELETE 등)
 * @param url API Endpoint (schema.d.ts에 정의된 키)
 * @param args Path Parameter 객체 (필요한 경우) 및 Request Body
 */
export async function requestApi<T extends Endpoint, M extends Method<T>>(
  method: M,
  url: T,
  ...args: RequestArgs<T>
): Promise<Response<T, M>> {
  const [params, body] = args;
  let actualUrl = url as string;

  // Path Parameter 치환 (e.g. /api/subscribe/{pid} -> /api/subscribe/123)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      actualUrl = actualUrl.replace(`{${key}}`, String(value));
    });
  }

  // httpClient를 사용하여 요청
  switch (method) {
    case "GET":
      return httpClient.get<Response<T, M>>(actualUrl);
    case "POST":
      return httpClient.post<Response<T, M>>(actualUrl, body);
    case "DELETE":
      return httpClient.delete<Response<T, M>>(actualUrl);
    case "PUT":
      return httpClient.put<Response<T, M>>(actualUrl, body);
    default:
      throw new Error(`Unsupported method: ${String(method)}`);
  }
}