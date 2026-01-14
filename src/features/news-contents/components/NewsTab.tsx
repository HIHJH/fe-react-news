import GridIcon from "@/assets/icons/grid_icon.svg?react";
import ListIcon from "@/assets/icons/list_icon.svg?react";
import type { NewsViewMode } from "@/features/news-contents/NewsContents";

interface NewsTabProps {
  viewMode: NewsViewMode;
  onViewModeChange: (viewMode: NewsViewMode) => void;
}

const NewsTab = ({ viewMode, onViewModeChange }: NewsTabProps) => {
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
    <div className="flex justify-between">
      <div className="flex gap-6">
        <TabButton
          isActive={!isFiltered}
          buttonText="전체 언론사"
          onClick={() => handleFilterChange("all")}
        />
        <TabButton
          isActive={isFiltered}
          buttonText="내가 구독한 언론사"
          onClick={() => handleFilterChange("subscribed")}
        />
      </div>
      <div className="flex gap-2">
        <ListIcon
          className={isGrid ? "text-weak" : "text-point"}
          onClick={() => handleViewChange("list")}
        />
        <GridIcon
          className={isGrid ? "text-point" : "text-weak"}
          onClick={() => handleViewChange("grid")}
        />
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive?: boolean;
  buttonText: string;
  onClick?: () => void;
}

export const TabButton = ({
  isActive,
  buttonText,
  onClick,
}: TabButtonProps) => {
  return (
    <button
      className={`${
        isActive ? "typo-selected-bold-16" : "typo-available-medium-16"
      }`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default NewsTab;
