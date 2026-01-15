import { useState, useEffect, useMemo, useCallback } from "react";
import type { GridItem } from "./useCompositeNewsstand";

const ITEMS_PER_PAGE = 24;

export const useGridNavigation = (
  data: GridItem[] | null,
  isSubscribed: boolean
) => {
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(0);
  }, [isSubscribed]);

  useEffect(() => {
    if (data && pageIndex * ITEMS_PER_PAGE >= data.length && pageIndex > 0) {
      setPageIndex(Math.max(0, Math.ceil(data.length / ITEMS_PER_PAGE) - 1));
    }
  }, [data?.length, pageIndex]);

  const totalPages = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  }, [data]);

  const paginatedData = useMemo(() => {
    const sourceData = data || [];
    const startIdx = pageIndex * ITEMS_PER_PAGE;
    const sliced = sourceData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    const padded: ((typeof sliced)[number] | null)[] = [...sliced];
    while (padded.length < ITEMS_PER_PAGE) {
      padded.push(null);
    }
    return padded;
  }, [data, pageIndex]);

  const handlePrev = useCallback(() => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  return {
    pageIndex,
    totalPages,
    paginatedData,
    handlePrev,
    handleNext,
  };
};
