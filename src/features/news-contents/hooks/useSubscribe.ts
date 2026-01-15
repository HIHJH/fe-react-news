import { requestApi } from "@/api/client";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 구독 추가
export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pid: string) => requestApi("POST", "/api/subscribe/{pid}", { pid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newsQueryKeys.subscriptions(),
      });
    },
  });
};
