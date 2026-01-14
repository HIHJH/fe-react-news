import { useCallback } from "react";
import type { Dispatch } from "react";
import type { NewsAction } from "@/features/news-contents/store/newsReducer";

export function useFilterHandlers(dispatch: Dispatch<NewsAction>) {
  const handleNewsFilter = useCallback(
    (value: "all" | "subscribed") => {
      dispatch({ type: "SET_FILTER", payload: value });
    },
    [dispatch]
  );

  const handleNewsViewMode = useCallback(
    (value: "grid" | "list") => {
      dispatch({ type: "SET_VIEW_MODE", payload: value });
    },
    [dispatch]
  );

  return {
    handleNewsFilter,
    handleNewsViewMode,
  };
}
