import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNewsstand, useNewsstandPress } from "../../hooks/useNewsstand";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { httpClient } from "@/api/newsClient";
import { useListNavigation } from "../../hooks/useListNavigation";
import List from "./List";

export const ListContainer = () => {
  const queryClient = useQueryClient();
  const { data: newsstandData, isLoading: isNewsstandLoading } = useNewsstand();
  const categories = newsstandData?.catePidList || [];
  const {
    currentCategoryIndex,
    currentPressIndex,
    currentPid,
    nextPid,
    handleNext,
    handlePrev,
    handleCategoryChange,
  } = useListNavigation(categories);
  const { data: pressData } = useNewsstandPress(currentPid);

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
    return <div>Loading...</div>;
  }

  return (
    <List
      categories={categories}
      currentCategoryIndex={currentCategoryIndex}
      currentPressIndex={currentPressIndex}
      onCategoryChange={handleCategoryChange}
      onNext={handleNext}
      onPrev={handlePrev}
      pressData={pressData}
    />
  );
};
