import LeftArrowIcon from "@/assets/icons/left_arrow.svg?react";
import RightArrowIcon from "@/assets/icons/right_arrow.svg?react";
import type { CategoryInfo, NewsstandPress } from "@/api/api";

interface ListViewProps {
  categories: CategoryInfo[];
  currentCategoryIndex: number;
  currentPressIndex: number;
  onCategoryChange: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  pressData?: NewsstandPress;
}

const List = ({
  categories,
  currentCategoryIndex,
  currentPressIndex,
  onCategoryChange,
  onNext,
  onPrev,
  pressData,
}: ListViewProps) => {
  // Removed unused currentCategory variable

  return (
    <div className="w-full border border-default bg-surface-default relative">
      {/* Category Tabs */}
      <div className="flex border-b border-default bg-surface-alt w-full overflow-x-auto scrollbar-hide">
        {categories.map((cat, idx) => {
          const isActive = idx === currentCategoryIndex;
          return (
            <div
              key={cat.label}
              className={`
                relative flex items-center justify-center px-4 py-3 cursor-pointer whitespace-nowrap overflow-hidden
                ${isActive
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
                    <span className="text-white-default">{currentPressIndex + 1}</span>
                    <span className="text-white-weak">/{cat.count}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="p-6 min-h-[300px] flex flex-col justify-between">
        {pressData ? (
          <>
            {/* Press Header */}
            <div className="flex items-center gap-4 mb-6">
              {(pressData.logoLight?.url || pressData.logoDark?.url) && (
                <img
                  src={pressData.logoLight?.url || pressData.logoDark?.url}
                  alt={pressData.name}
                  className="h-6 object-contain"
                />
              )}
              {!pressData.logoLight && !pressData.logoDark && (
                <span className="typo-display-bold-16 text-strong">
                  {pressData.name}
                </span>
              )}

              <span className="text-default text-xs">
                {pressData.regDate} 편집
              </span>
              <button className="btn-outline rounded-full text-xs px-3 py-1 hover:bg-surface-alt transition-colors">
                + 구독하기
              </button>
            </div>

            {/* Articles Grid */}
            <div className="flex gap-6 h-full">
              {/* Main Article (Left) */}
              <div className="w-[40%] flex flex-col gap-3 cursor-pointer group">
                {pressData.materials[0] && (
                  <div
                    onClick={() => {
                      if (pressData.materials[0].url) {
                        window.open(pressData.materials[0].url, "_blank");
                      }
                    }}
                  >
                    <div className="w-full aspect-video overflow-hidden rounded bg-surface-alt border border-default">
                      {pressData.materials[0].image ? (
                        <img
                          src={pressData.materials[0].image.url}
                          alt={pressData.materials[0].title}
                          className="w-full h-full object-cover transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-weak">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="typo-display-medium-16 text-strong group-hover:underline line-clamp-2 mt-3">
                      {pressData.materials[0].title}
                    </div>
                  </div>
                )}
              </div>

              {/* Sub Articles (Right) */}
              <div className="w-[60%] flex flex-col justify-between">
                <ul className="flex flex-col gap-3">
                  {pressData.materials.slice(1, 7).map((article) => (
                    <li
                      key={article.aid}
                      className="typo-available-medium-16 text-bold hover:underline cursor-pointer truncate"
                      onClick={() => {
                        if (article.url) {
                          window.open(article.url, "_blank");
                        }
                      }}
                    >
                      {article.title}
                    </li>
                  ))}
                </ul>
                <div className="text-weak text-xs mt-4">
                  {pressData.name} 언론사에서 직접 편집한 뉴스입니다.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-default">
            Loading...
          </div>
        )}
      </div>

      {/* Navigation Buttons from GridContainer */}
      <button
        onClick={onPrev}
        className="absolute top-1/2 -left-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="이전 언론사"
      >
        <LeftArrowIcon />
      </button>

      <button
        onClick={onNext}
        className="absolute top-1/2 -right-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="다음 언론사"
      >
        <RightArrowIcon />
      </button>
    </div>
  );
};

export default List;
