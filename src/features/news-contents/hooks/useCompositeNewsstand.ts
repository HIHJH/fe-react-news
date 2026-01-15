import { useNewsstand } from "@/features/news-contents/hooks/useNewsstand";
import { useSubscription } from "@/features/news-contents/hooks/useSubscription";
import { useEffect, useMemo, useState } from "react";

export type GridItem = {
  pid: string;
  name: string;
  logoLight: string;
  logoDark: string;
  isSubscribed: boolean;
};
export type NewsstandMapData = GridItem[];

const MAX_ALL_GRID_ITEMS = 96;

// [TODO] 수정 필요
export const useCompositeNewsstand = () => {
  const { data: subData, isLoading: isSubLoading } = useSubscription();
  const { data: rawNewsData, isLoading: isNewsLoading } = useNewsstand();

  const subPids = subData?.pids ?? [];

  // 전체 그리드의 랜덤 순서는 rawNewsData가 바뀔 때만 새로 생성 (= 새로고침/재요청 시 랜덤)
  const [allOrder, setAllOrder] = useState<string[]>([]);

  useEffect(() => {
    const blocks = rawNewsData?.blocks ?? [];
    const pids = blocks.map((b) => b?.pid).filter(Boolean) as string[];
    setAllOrder(shuffle(pids));
  }, [rawNewsData]);

  const { allGridData, subscribedGridData } = useMemo(() => {
    if (!rawNewsData) {
      return {
        allGridData: null as GridItem[] | null,
        subscribedGridData: null as GridItem[] | null,
      };
    }

    const blocks = rawNewsData.blocks ?? [];
    const subSet = new Set(subPids);

    // pid -> 원본 아이템 맵
    const byPid = new Map<string, any>();
    for (const b of blocks) {
      if (b?.pid) byPid.set(b.pid, b);
    }

    // 전체
    // allOrder(셔플된 pid 순서) 유지 + 96개 제한
    const all = (
      allOrder.length ? allOrder : blocks.map((b) => b?.pid).filter(Boolean)
    )
      .map((pid) => byPid.get(pid ?? ""))
      .filter(Boolean)
      .slice(0, MAX_ALL_GRID_ITEMS)
      .map((item) => toGridItem(item, subSet));

    // 구독
    // subPids 배열 순서 그대로 + 제한 없음(없는 pid는 제외)
    const subscribed = subPids
      .map((pid) => byPid.get(pid))
      .filter(Boolean)
      .map((item) => toGridItem(item, subSet));

    return { allGridData: all, subscribedGridData: subscribed };
  }, [rawNewsData, subPids, allOrder]);

  return {
    allGridData,
    subscribedGridData,
    isLoading: isSubLoading || isNewsLoading,
  };
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const toGridItem = (item: any, subSet: Set<string>): GridItem => {
  const pid = item?.pid ?? "";
  return {
    pid,
    name: item?.name ?? "",
    logoLight: item?.logoLight?.url || "",
    logoDark: item?.logoDark?.url || "",
    isSubscribed: subSet.has(pid),
  };
};
