import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNewsstandPress,
  getSubscriptions,
  addSubscription,
  removeSubscription,
  getRolling,
} from "@/api/newsClient";

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

// 특정 언론사 조회
export const useNewsstandPress = (pid: string) => {
  return useQuery({
    queryKey: newsQueryKeys.newsstandDetail(pid),
    queryFn: () => getNewsstandPress(pid),
    enabled: !!pid,
  });
};

// 구독 목록 조회
export const useSubscriptions = () => {
  return useQuery({
    queryKey: newsQueryKeys.subscriptions(),
    queryFn: getSubscriptions,
  });
};

// 구독 추가
export const useAddSubscription = () => {
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

// 구독 해제
export const useRemoveSubscription = () => {
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

// 롤링 뉴스 조회
export const useRolling = () => {
  return useQuery({
    queryKey: newsQueryKeys.rolling(),
    queryFn: getRolling,
  });
};
