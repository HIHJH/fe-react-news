import { useCompositeNewsstand } from "@/features/news-contents/hooks/useCompositeNewsstand";
import Grid from "@/features/news-contents/components/grid/Grid";
import LeftArrowIcon from "@/assets/icons/left_arrow.svg?react";
import RightArrowIcon from "@/assets/icons/right_arrow.svg?react";
import { useGridNavigation } from "../../hooks/useGridNavigation";

type GridContainerProps = {
  isFiltered: boolean;
};

const GridContainer = ({ isFiltered }: GridContainerProps) => {
  const { allGridData, subscribedGridData } = useCompositeNewsstand();
  const data = isFiltered ? subscribedGridData : allGridData;

  const {
    pageIndex,
    totalPages,
    paginatedData,
    handlePrev,
    handleNext,
  } = useGridNavigation(data, isFiltered);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[930px]">
        <div className="relative">
          <div className="w-[930px] h-[388px]">
            <Grid data={paginatedData} />
          </div>
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                disabled={pageIndex === 0}
                className="absolute top-1/2 -left-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center disabled:invisible opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="이전 페이지"
              >
                <LeftArrowIcon />
              </button>

              <button
                onClick={handleNext}
                disabled={pageIndex === totalPages - 1}
                className="absolute top-1/2 -right-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center disabled:invisible opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="다음 페이지"
              >
                <RightArrowIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GridContainer;
