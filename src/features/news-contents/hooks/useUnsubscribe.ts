import { removeSubscription } from "@/api/newsClient";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 구독 해제
export const useUnsubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newsQueryKeys.subscriptions(),
      });
    },
  });
};
