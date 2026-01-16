import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNewsstand, useNewsstandPress } from "../../hooks/useNewsstand";
import { useSubscription } from "../../hooks/useSubscription";
import { useSubscriptionToggle } from "../../hooks/useSubscriptionToggle";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { httpClient } from "@/api/newsClient";
import { useListNavigation } from "../../hooks/useListNavigation";
import ListCategoryTab from "@/features/news-contents/components/list/ListCategoryTab";
import List from "@/features/news-contents/components/list/List";
import PaginationButtons from "@/features/news-contents/components/pagination/PaginationButtons";

export const ListContainer = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const queryClient = useQueryClient();
  const { data: newsstandData, isLoading: isNewsstandLoading } = useNewsstand();
  const { data: subscriptionData } = useSubscription();

  const displayCategories = useMemo(() => {
    if (!newsstandData) return [];
    if (!isSubscribed) return newsstandData.catePidList;

    const subPids = new Set(subscriptionData?.pids || []);

    return newsstandData.catePidList
      .map((cat) => {
        const filteredPids = cat.pids.filter((pid) => subPids.has(pid));
        return {
          ...cat,
          pids: filteredPids,
          count: filteredPids.length,
        };
      })
      .filter((cat) => cat.pids.length > 0);
  }, [newsstandData, isSubscribed, subscriptionData]);

  const {
    currentCategoryIndex,
    currentPressIndex,
    currentPid,
    nextPid,
    handleNext,
    handlePrev,
    handleCategoryChange,
  } = useListNavigation(displayCategories);

  const { data: pressData } = useNewsstandPress(currentPid);
  const { isPending, handleToggle } = useSubscriptionToggle();

  const isSubscribedPress = useMemo(
    () => subscriptionData?.pids.includes(pressData?.pid || "") || false,
    [subscriptionData, pressData]
  );

  useEffect(() => {
    if (nextPid) {
      queryClient.prefetchQuery({
        queryKey: newsQueryKeys.newsstandDetail(nextPid),
        queryFn: () => httpClient.get(`/api/newsstand/${nextPid}`),
        staleTime: 5 * 60 * 1000,
      });
    }
  }, [nextPid, queryClient]);

  if (isNewsstandLoading || !newsstandData) {
    return (
      <div className="flex items-center justify-center p-10 text-default">
        Loading...
      </div>
    );
  }

  if (isSubscribed && displayCategories.length === 0) {
    return (
      <div className="flex items-center justify-center p-10 text-default">
        구독한 언론사가 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full border border-default bg-surface-default relative">
      <ListCategoryTab
        categories={displayCategories}
        currentCategoryIndex={currentCategoryIndex}
        currentPressIndex={currentPressIndex}
        onCategoryChange={handleCategoryChange}
        onNext={handleNext}
      />
      <List
        pressData={pressData}
        isSubscribed={isSubscribedPress}
        isPending={isPending}
        onSubscriptionToggle={handleToggle}
      />
      <PaginationButtons
        onNext={handleNext}
        onPrev={handlePrev}
        ariaLabels={{
          prev: "이전 언론사",
          next: "다음 언론사",
        }}
      />
    </div>
  );
};
