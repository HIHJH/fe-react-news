import { getSubscriptions } from "@/api/newsClient";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useQuery } from "@tanstack/react-query";

// 구독 목록 조회
export const useSubscription = () => {
  return useQuery({
    queryKey: newsQueryKeys.subscriptions(),
    queryFn: getSubscriptions,
  });
};
