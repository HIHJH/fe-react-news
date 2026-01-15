import type { NewsstandMapData } from "@/features/news-contents/hooks/useCompositeNewsstand";
import { useSubscribe } from "@/features/news-contents/hooks/useSubscribe";
import { useUnsubscribe } from "@/features/news-contents/hooks/useUnsubscribe";
import PlusIcon from "@/assets/icons/plus.svg?react";
import CrossIcon from "@/assets/icons/cross.svg?react";

type GridItem = NewsstandMapData[number];

type GridProps = {
  data: (GridItem | null)[];
};

const Grid = ({ data }: GridProps) => {
  const { mutate: subscribe, isPending: isSubscribePending } = useSubscribe();
  const { mutate: unSubscribe, isPending: isUnsubscribePending } =
    useUnsubscribe();

  const handleSubscriptionToggle = (pid: string, isSubscribed: boolean) => {
    if (isSubscribed) {
      unSubscribe(pid);
    } else {
      subscribe(pid);
    }
  };

  const isPending = isSubscribePending || isUnsubscribePending;

  return (
    <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-px bg-gray-200 border border-gray-200">
      {data.map((news, index) => {
        if (!news) {
          return <div key={`empty-${index}`} className="bg-white" />;
        }

        return (
          <div
            key={news.pid}
            className="group relative flex items-center justify-center bg-white hover:bg-gray-100 overflow-hidden"
          >
            <img
              src={news.logoLight}
              alt={news.name}
              className="h-5 max-w-full object-contain group-hover:opacity-0 transition-opacity duration-200"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscriptionToggle(news.pid, news.isSubscribed);
              }}
              className="absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-6 flex items-center justify-center gap-0.5 bg-white border border-gray-200 rounded-full text-gray-500 text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-200 hover:bg-gray-50 whitespace-nowrap z-10"
              aria-label={news.isSubscribed ? "해지하기" : "구독하기"}
              disabled={isPending}
            >
              {news.isSubscribed ? (
                <>
                  <CrossIcon className="w-3 text-weak" />
                  해지하기
                </>
              ) : (
                <>
                  <PlusIcon className="w-3 text-weak" />
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
