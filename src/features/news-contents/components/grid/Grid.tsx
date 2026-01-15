import type { NewsstandMapData } from "@/features/news-contents/hooks/useCompositeNewsstand";
import { useSubscribe } from "@/features/news-contents/hooks/useSubscribe";
import { useUnsubscribe } from "@/features/news-contents/hooks/useUnsubscribe";

type GridItem = NewsstandMapData[number];

type GridProps = {
  data: (GridItem | null)[];
};

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z"
      fill="currentColor"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path
      d="M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z"
      fill="currentColor"
    />
  </svg>
);

const Grid = ({ data }: GridProps) => {
  const { mutate: subscribe } = useSubscribe();
  const { mutate: unSubscribe } = useUnsubscribe();

  const handleSubscriptionToggle = (pid: string, isSubscribed: boolean) => {
    if (isSubscribed) {
      unSubscribe(pid);
    } else {
      subscribe(pid);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-px bg-gray-200 border border-gray-200">
      {data.map((news, index) => {
        if (!news) {
          return (
            <div
              key={`empty-${index}`}
              className="bg-white"
            />
          );
        }

        return (
          <div
            key={news.pid}
            className="group relative flex items-center justify-center bg-white hover:bg-gray-100 cursor-pointer overflow-hidden"
          >
            {/* Logo Image */}
            <img
              src={news.logoLight}
              alt={news.name}
              className="h-5 max-w-full object-contain group-hover:opacity-0 transition-opacity duration-200"
            />

            {/* Subscribe/Unsubscribe Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscriptionToggle(news.pid, news.isSubscribed);
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-6 flex items-center justify-center gap-0.5 bg-white border border-gray-200 rounded-full text-gray-500 text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-200 hover:bg-gray-50 whitespace-nowrap z-10"
              aria-label={news.isSubscribed ? "해지하기" : "구독하기"}
            >
              {news.isSubscribed ? (
                <>
                  <CrossIcon />
                  해지하기
                </>
              ) : (
                <>
                  <PlusIcon />
                  구독하기
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
