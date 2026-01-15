import type { CategoryInfo } from "@/api/api";

interface ListCategoryTabProps {
  categories: CategoryInfo[];
  currentCategoryIndex: number;
  currentPressIndex: number;
  onCategoryChange: (index: number) => void;
  onNext: () => void;
}

const ListCategoryTab = ({
  categories,
  currentCategoryIndex,
  currentPressIndex,
  onCategoryChange,
  onNext,
}: ListCategoryTabProps) => {
  return (
    <div className="flex border-b border-default bg-surface-alt w-full overflow-x-auto scrollbar-hide">
      {categories.map((cat, idx) => {
        const isActive = idx === currentCategoryIndex;
        return (
          <div
            key={cat.label}
            className={`
              relative flex items-center justify-center px-4 py-3 cursor-pointer whitespace-nowrap overflow-hidden
              ${
                isActive
                  ? "bg-surface-brand-alt text-white-default font-bold"
                  : "text-default hover:bg-surface-default"
              }
            `}
            onClick={() => onCategoryChange(idx)}
          >
            {isActive && (
              <div
                key={`${currentCategoryIndex}-${currentPressIndex}`}
                className="absolute top-0 left-0 h-full bg-surface-brand-default z-0"
                style={{ animation: "fillBar 20s linear forwards" }}
                onAnimationEnd={onNext}
              />
            )}
            <div className="relative z-10 flex items-center gap-10">
              <span className="mr-1">{cat.label}</span>
              {isActive && (
                <div className="text-xs">
                  <span className="text-white-default">
                    {currentPressIndex + 1}
                  </span>
                  <span className="text-white-weak">/{cat.count}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListCategoryTab;
