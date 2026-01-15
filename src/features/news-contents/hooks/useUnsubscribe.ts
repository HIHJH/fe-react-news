import { requestApi } from "@/api/client";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubscriptionList } from "@/api/api";

// 구독 해제
export const useUnsubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pid: string) =>
      requestApi("DELETE", "/api/subscribe/{pid}", { pid }),

    onMutate: async (pid: string) => {
      // 이전 데이터 저장
      await queryClient.cancelQueries({
        queryKey: newsQueryKeys.subscriptions(),
      });
      const previousData = queryClient.getQueryData<SubscriptionList>(
        newsQueryKeys.subscriptions()
      );

      // 낙관적 업데이트
      queryClient.setQueryData<SubscriptionList>(
        newsQueryKeys.subscriptions(),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pids: old.pids.filter((p) => p !== pid),
            count: Math.max(0, old.count - 1),
          };
        }
      );

      return { previousData };
    },

    onError: (_err, _pid, context) => {
      // 실패 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          newsQueryKeys.subscriptions(),
          context.previousData
        );
      }
    },
  });
};
