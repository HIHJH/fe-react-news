import { useQuery } from "@tanstack/react-query";
import { requestApi } from "./client";

export const newsQueryKeys = {
  all: ["news"] as const,
  newsstand: () => [...newsQueryKeys.all, "newsstand"] as const,
  newsstandDetail: (pid: string) =>
    [...newsQueryKeys.newsstand(), pid] as const,
  subscriptions: () => [...newsQueryKeys.all, "subscriptions"] as const,
  rolling: () => [...newsQueryKeys.all, "rolling"] as const,
};

/*
 * ---------
 * TODO: 사용할 때 함수 옮기기
 * ---------
 */



// 롤링 뉴스 조회
export const useRolling = () => {
  return useQuery({
    queryKey: newsQueryKeys.rolling(),
    queryFn: () => requestApi("GET", "/api/rolling"),
  });
};
