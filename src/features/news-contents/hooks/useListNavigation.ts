import { useState, useCallback, useMemo, useEffect, } from "react";
import type { CategoryInfo } from "@/api/api";

export const useListNavigation = (categories: CategoryInfo[]) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentPressIndex, setCurrentPressIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (!categories.length) return;

    const currentCategory = categories[currentCategoryIndex];
    if (currentPressIndex < currentCategory.pids.length - 1) {
      setCurrentPressIndex((prev) => prev + 1);
    } else {
      if (currentCategoryIndex < categories.length - 1) {
        setCurrentCategoryIndex((prev) => prev + 1);
        setCurrentPressIndex(0);
      } else {
        setCurrentCategoryIndex(0);
        setCurrentPressIndex(0);
      }
    }
  }, [categories, currentCategoryIndex, currentPressIndex]);

  const handlePrev = useCallback(() => {
    if (!categories.length) return;

    if (currentPressIndex > 0) {
      setCurrentPressIndex((prev) => prev - 1);
    } else {
      if (currentCategoryIndex > 0) {
        const prevCategoryIndex = currentCategoryIndex - 1;
        setCurrentCategoryIndex(prevCategoryIndex);
        setCurrentPressIndex(categories[prevCategoryIndex].pids.length - 1);
      } else {
        const lastCategoryIndex = categories.length - 1;
        setCurrentCategoryIndex(lastCategoryIndex);
        setCurrentPressIndex(categories[lastCategoryIndex].pids.length - 1);
      }
    }
  }, [categories, currentCategoryIndex, currentPressIndex]);

  const handleCategoryChange = useCallback((index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentPressIndex(0);
  }, []);

  const currentPid = useMemo(() => {
    if (!categories.length) return "";
    return categories[currentCategoryIndex]?.pids[currentPressIndex] ?? "";
  }, [categories, currentCategoryIndex, currentPressIndex]);

  const nextPid = useMemo(() => {
    if (!categories.length) return "";

    let nextCatIdx = currentCategoryIndex;
    let nextPressIdx = currentPressIndex + 1;

    const currentCategory = categories[currentCategoryIndex];

    if (nextPressIdx >= currentCategory.pids.length) {
      nextCatIdx = currentCategoryIndex + 1;
      nextPressIdx = 0;

      if (nextCatIdx >= categories.length) {
        nextCatIdx = 0;
      }
    }

    return categories[nextCatIdx]?.pids[nextPressIdx] ?? "";
  }, [categories, currentCategoryIndex, currentPressIndex]);

  useEffect(() => {
    setCurrentCategoryIndex(0);
    setCurrentPressIndex(0);
  }, [categories]);

  return {
    currentCategoryIndex,
    currentPressIndex,
    currentPid,
    nextPid,
    handleNext,
    handlePrev,
    handleCategoryChange,
  };
};
