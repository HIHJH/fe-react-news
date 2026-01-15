import { useMemo, useState, useEffect } from "react";
import { useCompositeNewsstand } from "@/features/news-contents/hooks/useCompositeNewsstand";
import Grid from "@/features/news-contents/components/grid/Grid";

type GridContainerProps = {
  isFiltered: boolean;
};

const ITEMS_PER_PAGE = 24;

const LeftArrowIcon = () => (
  <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 10L6 20L16 30" stroke="#879296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightArrowIcon = () => (
  <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 10L18 20L8 30" stroke="#879296" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridContainer = ({ isFiltered }: GridContainerProps) => {
  const { allGridData, subscribedGridData } = useCompositeNewsstand();
  const [pageIndex, setPageIndex] = useState(0);

  const data = isFiltered ? subscribedGridData : allGridData;

  // Reset page index if type changes or data length shrinks
  useEffect(() => {
    setPageIndex(0);
  }, [isFiltered]);

  useEffect(() => {
    if (data && pageIndex * ITEMS_PER_PAGE >= data.length && pageIndex > 0) {
      setPageIndex(Math.max(0, Math.ceil(data.length / ITEMS_PER_PAGE) - 1));
    }
  }, [data?.length, pageIndex]);

  const paginatedData = useMemo(() => {
    const sourceData = data || [];
    const startIdx = pageIndex * ITEMS_PER_PAGE;
    const sliced = sourceData.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    // Pad array to ensure exactly 24 items
    const padded: (typeof sliced[number] | null)[] = [...sliced];
    while (padded.length < ITEMS_PER_PAGE) {
      padded.push(null);
    }
    return padded;
  }, [data, pageIndex]);

  const totalPages = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  }, [data]);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[930px]">
        <div className="relative">
          {/* Grid Container Fixed Size */}
          <div className="w-[930px] h-[388px]">
            {/* 
              Render Grid with data. 
              If loading and no data, we still render the structure (padded with nulls from memo default)
              Grid handles null items as empty cells.
            */}
            <Grid data={paginatedData} />
          </div>

          {/* Navigation Controls */}
          {totalPages > 1 && (
            <>
              <button
                onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
                disabled={pageIndex === 0}
                className="absolute top-1/2 -left-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center disabled:invisible opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="이전 페이지"
              >
                <LeftArrowIcon />
              </button>

              <button
                onClick={() => setPageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={pageIndex === totalPages - 1}
                className="absolute top-1/2 -right-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center disabled:invisible opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="다음 페이지"
              >
                <RightArrowIcon />
              </button>

              {/* Note: The reference implementation has prev/next buttons outside. */}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GridContainer;
