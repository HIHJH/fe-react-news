import { requestApi } from "@/api/client";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useQuery } from "@tanstack/react-query";

// 구독 목록 조회
export const useSubscription = () => {
  return useQuery({
    queryKey: newsQueryKeys.subscriptions(),
    queryFn: () => requestApi("GET", "/api/subscribe"),
    staleTime: 5 * 60 * 1000,
  });
};
