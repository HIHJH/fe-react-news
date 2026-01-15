import { useCompositeNewsstand } from "@/features/news-contents/hooks/useCompositeNewsstand";
import Grid from "@/features/news-contents/components/grid/Grid";
import PaginationButtons from "@/features/news-contents/components/pagination/PaginationButtons";
import { useGridNavigation } from "../../hooks/useGridNavigation";

type GridContainerProps = {
  isSubscribed: boolean;
};

const GridContainer = ({ isSubscribed }: GridContainerProps) => {
  const { allGridData, subscribedGridData } = useCompositeNewsstand();
  const data = isSubscribed ? subscribedGridData : allGridData;

  const { pageIndex, totalPages, paginatedData, handlePrev, handleNext } =
    useGridNavigation(data, isSubscribed);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[930px]">
        <div className="relative">
          <div className="w-[930px] h-[388px]">
            <Grid data={paginatedData} />
          </div>
          {totalPages > 1 && (
            <PaginationButtons
              onNext={handleNext}
              onPrev={handlePrev}
              isDisabled={{
                prev: pageIndex === 0,
                next: pageIndex === totalPages - 1,
              }}
              ariaLabels={{
                prev: "이전 페이지",
                next: "다음 페이지",
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default GridContainer;
