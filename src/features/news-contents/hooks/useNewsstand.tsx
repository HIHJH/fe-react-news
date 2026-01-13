import { getNewsstand } from "@/api/newsClient";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useSubscription } from "@/features/news-contents/hooks/useSubscribe";
import { useQuery } from "@tanstack/react-query";

type NewsstandData = Awaited<ReturnType<typeof getNewsstand>>;

// 뉴스그리드 데이터 조회 및 필요한 값만 반환
export const useNewsstandGrid = () => {
  const { data: subIdList } = useSubscription();

  return useQuery({
    queryKey: newsQueryKeys.newsstand(),
    queryFn: getNewsstand,
    select: (data) => transformNewsstandGrid(data, subIdList?.pids),
    enabled: !!subIdList,
  });
};

const transformNewsstandGrid = (data: NewsstandData, subIdList?: string[]) => {
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
