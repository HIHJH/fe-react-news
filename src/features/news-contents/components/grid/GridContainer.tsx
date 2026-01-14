import { useState, useMemo } from "react";
import { useCompositeNewsstand } from "@/features/news-contents/hooks/useCompositeNewsstand";
import Grid from "@/features/news-contents/components/grid/Grid";

type GridContainerProps = {
  isFiltered: boolean;
};

const ITEMS_PER_PAGE = 24;

const GridContainer = ({ isFiltered }: GridContainerProps) => {
  const { data, isLoading } = useCompositeNewsstand();
  const [pageIndex, setPageIndex] = useState(0);

  const paginatedData = useMemo(() => {
    if (!data) return [];

    // isFiltered가 true면 구독한 것만 필터링
    const filteredData = isFiltered
      ? data.filter((item) => item.isSubscribed)
      : data;

    const sliced = filteredData.slice(0, 96);

    const startIdx = pageIndex * ITEMS_PER_PAGE;
    return sliced.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [data, pageIndex, isFiltered]);

  const totalPages = useMemo(() => {
    if (!data) return 0;

    // isFiltered가 true면 구독한 것만으로 페이지 계산
    const filteredData = isFiltered
      ? data.filter((item) => item.isSubscribed)
      : data;

    const sliced = filteredData.slice(0, 96);

    return Math.ceil((sliced?.length || 0) / ITEMS_PER_PAGE);
  }, [data, isFiltered]);

  if (isLoading) {
    return (
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {isFiltered ? "구독한 언론사 그리드" : "전체 언론사 그리드"}
        </h2>
        <div className="grid grid-cols-6 gap-4">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {isFiltered ? "구독한 언론사 그리드" : "전체 언론사 그리드"}
        </h2>
        <div className="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          데이터를 불러올 수 없습니다.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        {isFiltered ? "구독한 언론사 그리드" : "전체 언론사 그리드"}
      </h2>
      <Grid data={paginatedData} />
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
            disabled={pageIndex === 0}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="이전 페이지"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            {pageIndex + 1} / {totalPages}
          </span>

          <button
            onClick={() =>
              setPageIndex(Math.min(totalPages - 1, pageIndex + 1))
            }
            disabled={pageIndex === totalPages - 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="다음 페이지"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {data.length === 0 && (
        <div className="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          언론사가 없습니다.
        </div>
      )}
    </section>
  );
};

export default GridContainer;
