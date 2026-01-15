import { requestApi } from "@/api/client";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 구독 해제
export const useUnsubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pid: string) => requestApi("DELETE", "/api/subscribe/{pid}", { pid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newsQueryKeys.subscriptions(),
      });
    },
  });
};
