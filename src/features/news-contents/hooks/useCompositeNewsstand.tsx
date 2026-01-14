import type { getNewsstand } from "@/api/newsClient";
import { useNewsstand } from "@/features/news-contents/hooks/useNewsstand";
import { useSubscription } from "@/features/news-contents/hooks/useSubscription";
import { useMemo } from "react";

type NewsstandData = Awaited<ReturnType<typeof getNewsstand>>;

export const useCompositeNewsstand = () => {
  const { data: subIdList, isLoading: isSubLoading } = useSubscription();
  const { data: rawNewsData, isLoading: isNewsLoading } = useNewsstand();

  const gridData = useMemo(() => {
    if (!rawNewsData || !subIdList) return null;
    return transformNewsstand(rawNewsData, subIdList.pids);
  }, [rawNewsData, subIdList]);

  return {
    data: gridData,
    isLoading: isSubLoading || isNewsLoading,
  };
};

const transformNewsstand = (data: NewsstandData, subIdList?: string[]) => {
  // 구독 ID Set 생성
  const subIdSet = subIdList ? new Set(subIdList) : new Set<string>();

  // 랜덤으로 96개 뽑아서 반환
  const shuffled = data.blocks?.sort(() => 0.5 - Math.random());
  const sliced = shuffled?.slice(0, 96);

  return (
    sliced?.map((item) => ({
      pid: item.pid,
      name: item.name,
      logoLight: item.logoLight?.url || "",
      logoDark: item.logoDark?.url || "",
      isSubscribed: subIdSet.has(item.pid ?? ""),
    })) || []
  );
};
