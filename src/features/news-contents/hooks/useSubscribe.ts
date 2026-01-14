import { addSubscription } from "@/api/newsClient";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 구독 추가
export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newsQueryKeys.subscriptions(),
      });
    },
  });
};
