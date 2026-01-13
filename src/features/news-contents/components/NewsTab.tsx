import GridIcon from "@/assets/icons/grid_icon.svg?react";
import ListIcon from "@/assets/icons/list_icon.svg?react";

interface NewsTabProps {
  isGrid: boolean;
  isFiltered: boolean;
  onFilterChange: (filter: "all" | "subscribed") => void;
  onViewChange: (view: "grid" | "list") => void;
}

const NewsTab = ({
  isGrid,
  isFiltered,
  onFilterChange,
  onViewChange,
}: NewsTabProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <TabButton
          isActive={!isFiltered}
          buttonText="전체 언론사"
          onClick={() => onFilterChange("all")}
        />
        <TabButton
          isActive={isFiltered}
          buttonText="내가 구독한 언론사"
          onClick={() => onFilterChange("subscribed")}
        />
      </div>
      <div className="flex gap-2">
        <ListIcon
          className={isGrid ? "text-weak" : "text-point"}
          onClick={() => onViewChange("list")}
        />
        <GridIcon
          className={isGrid ? "text-point" : "text-weak"}
          onClick={() => onViewChange("grid")}
        />
      </div>
    </div>
  );
};

// 수정 예정
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
