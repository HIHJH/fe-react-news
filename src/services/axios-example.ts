import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { paths } from "./api";

// axios 인스턴스 생성
const API_BASE_URL = "https://news-worker.forhyundaisofteer.workers.dev";
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 전송을 위해 필요
});

// GET 응답 타입 추출 헬퍼
type GetResponse<T extends keyof paths> = paths[T]["get"] extends {
  responses: { 200: { content: { "application/json": infer R } } };
}
  ? R
  : paths[T]["get"] extends {
      responses: { 201: { content: { "application/json": infer R } } };
    }
  ? R
  : never;

// POST 응답 타입 추출 헬퍼
type PostResponse<T extends keyof paths> = paths[T]["post"] extends {
  responses: { 201: { content: { "application/json": infer R } } };
}
  ? R
  : paths[T]["post"] extends {
      responses: { 200: { content: { "application/json": infer R } } };
    }
  ? R
  : never;

// DELETE 응답 타입 추출 헬퍼
type DeleteResponse<T extends keyof paths> = paths[T]["delete"] extends {
  responses: { 200: { content: { "application/json": infer R } } };
}
  ? R
  : never;

// Path 파라미터 타입 추출 헬퍼
type PathParams<
  T extends keyof paths,
  M extends "get" | "post" | "delete"
> = paths[T][M] extends { parameters: { path: infer P } } ? P : never;

/**
 * /api/newsstand - 모든 언론사 정보 조회
 */
export async function getNewsstand(): Promise<GetResponse<"/api/newsstand">> {
  const response: AxiosResponse<GetResponse<"/api/newsstand">> =
    await apiClient.get<GetResponse<"/api/newsstand">>("/api/newsstand");

  return response.data;
}

/**
 * /api/newsstand/{pid} - 특정 언론사 정보 조회
 */
export async function getNewsstandPress(
  pid: string
): Promise<GetResponse<"/api/newsstand/{pid}">> {
  const response: AxiosResponse<GetResponse<"/api/newsstand/{pid}">> =
    await apiClient.get<GetResponse<"/api/newsstand/{pid}">>(
      `/api/newsstand/${pid}`
    );
  return response.data;
}

/**
 * /api/subscribe - 현재 사용자의 구독 목록 조회
 */
export async function getSubscriptions(): Promise<
  GetResponse<"/api/subscribe">
> {
  const response: AxiosResponse<GetResponse<"/api/subscribe">> =
    await apiClient.get<GetResponse<"/api/subscribe">>("/api/subscribe");

  return response.data;
}

/**
 * /api/subscribe/{pid} POST - 구독 추가
 */
export async function addSubscription(
  pid: string
): Promise<PostResponse<"/api/subscribe/{pid}">> {
  const response: AxiosResponse<PostResponse<"/api/subscribe/{pid}">> =
    await apiClient.post<PostResponse<"/api/subscribe/{pid}">>(
      `/api/subscribe/${pid}`
    );
  return response.data;
}

/**
 * /api/subscribe/{pid} DELETE - 구독 해제
 */
export async function removeSubscription(
  pid: string
): Promise<DeleteResponse<"/api/subscribe/{pid}">> {
  const response: AxiosResponse<DeleteResponse<"/api/subscribe/{pid}">> =
    await apiClient.delete<DeleteResponse<"/api/subscribe/{pid}">>(
      `/api/subscribe/${pid}`
    );
  return response.data;
}

/**
 * /api/rolling - 롤링 뉴스 데이터 조회
 */
export async function getRolling(): Promise<GetResponse<"/api/rolling">> {
  const response: AxiosResponse<GetResponse<"/api/rolling">> =
    await apiClient.get<GetResponse<"/api/rolling">>("/api/rolling");
  return response.data;
}
