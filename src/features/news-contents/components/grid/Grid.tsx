import { useState, useMemo } from "react";
import { useNewsstandGrid } from "@/features/news-contents/hooks/useNewsstand";

interface GridProps {
  isFiltered: boolean;
}

const ITEMS_PER_PAGE = 24;

const Grid = ({ isFiltered }: GridProps) => {
  const { data, isLoading, isError } = useNewsstandGrid();
  const [pageIndex, setPageIndex] = useState(0);

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIdx = pageIndex * ITEMS_PER_PAGE;
    return data.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [data, pageIndex]);

  const totalPages = useMemo(() => {
    return Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
  }, [data]);

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

  if (isError || !data) {
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

      <div className="grid grid-cols-6 gap-4">
        {paginatedData.map((news) => (
          <div
            key={news.pid}
            className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-gray-900/50 cursor-pointer"
          >
            {/* Logo Image */}
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-3">
              <img
                src={news.logoLight}
                alt={news.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {/* News Name Tooltip */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs font-medium truncate">
                {news.name}
              </p>
            </div>
          </div>
        ))}
      </div>

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

export default Grid;
