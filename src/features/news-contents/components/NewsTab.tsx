import { useSubscription } from "@/features/news-contents/hooks/useSubscription";
import GridIcon from "@/assets/icons/grid_icon.svg?react";
import ListIcon from "@/assets/icons/list_icon.svg?react";
import type { NewsViewMode } from "@/features/news-contents/NewsContents";

interface NewsTabProps {
  viewMode: NewsViewMode;
  onViewModeChange: (viewMode: NewsViewMode) => void;
}

const NewsTab = ({ viewMode, onViewModeChange }: NewsTabProps) => {
  const { data: subscriptionData } = useSubscription();
  const subscriptionCount = subscriptionData?.pids?.length ?? 0;

  const isGrid = viewMode === "GRID_ALL" || viewMode === "GRID_SUBSCRIBED";
  const isFiltered =
    viewMode === "GRID_SUBSCRIBED" || viewMode === "LIST_SUBSCRIBED";

  const handleFilterChange = (filter: "all" | "subscribed") => {
    const newViewMode =
      filter === "all"
        ? isGrid
          ? "GRID_ALL"
          : "LIST_ALL"
        : isGrid
          ? "GRID_SUBSCRIBED"
          : "LIST_SUBSCRIBED";
    onViewModeChange(newViewMode);
  };

  const handleViewChange = (view: "grid" | "list") => {
    const newViewMode =
      view === "grid"
        ? isFiltered
          ? "GRID_SUBSCRIBED"
          : "GRID_ALL"
        : isFiltered
          ? "LIST_SUBSCRIBED"
          : "LIST_ALL";
    onViewModeChange(newViewMode);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex gap-6 items-center">
        <button
          onClick={() => handleFilterChange("all")}
          className={`flex items-center gap-1.5 text-base border-none bg-transparent cursor-pointer p-0 transition-colors duration-200 ${!isFiltered
              ? "font-bold text-black"
              : "text-gray-500 hover:text-black"
            }`}
        >
          전체 언론사
        </button>
        <button
          onClick={() => handleFilterChange("subscribed")}
          className={`flex items-center gap-1.5 text-base border-none bg-transparent cursor-pointer p-0 transition-colors duration-200 ${isFiltered
              ? "font-bold text-black"
              : "text-gray-500 hover:text-black"
            }`}
        >
          내가 구독한 언론사
          <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-lg text-xs font-medium">
            {subscriptionCount}
          </span>
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleViewChange("list")}
          className={`w-6 h-6 flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-opacity duration-200 hover:opacity-70 ${!isGrid ? "text-blue-600" : "text-gray-400"
            }`}
          aria-label="리스트 보기"
        >
          <ListIcon className="w-full h-full fill-current" />
        </button>
        <button
          onClick={() => handleViewChange("grid")}
          className={`w-6 h-6 flex items-center justify-center p-0 bg-transparent border-none cursor-pointer transition-opacity duration-200 hover:opacity-70 ${isGrid ? "text-blue-600" : "text-gray-400"
            }`}
          aria-label="그리드 보기"
        >
          <GridIcon className="w-full h-full fill-current" />
        </button>
      </div>
    </div>
  );
};

export default NewsTab;
