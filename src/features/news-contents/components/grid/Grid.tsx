import type { NewsstandMapData } from "@/features/news-contents/hooks/useCompositeNewsstand";
import { useSubscribe } from "@/features/news-contents/hooks/useSubscribe";
import { useUnsubscribe } from "@/features/news-contents/hooks/useUnsubscribe";

type GridProps = {
  data: NewsstandMapData;
};

const Grid = ({ data }: GridProps) => {
  const { mutate: subscribe, isPending: isSubscribing } = useSubscribe();
  const { mutate: unSubscribe, isPending: isUnsubscribing } = useUnsubscribe();

  const handleSubscriptionToggle = (pid: string, isSubscribed: boolean) => {
    if (isSubscribed) {
      unSubscribe(pid);
    } else {
      subscribe(pid);
    }
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-6 gap-4">
        {data.map((news) => (
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

            {/* News Name Tooltip */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs font-medium truncate">
                {news.name}
              </p>
            </div>

            {/* Subscribe Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscriptionToggle(news?.pid ?? "", news.isSubscribed);
                }}
                disabled={isSubscribing || isUnsubscribing}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  news.isSubscribed
                    ? "bg-gray-400 text-white hover:bg-gray-500 disabled:bg-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubscribing || isUnsubscribing
                  ? "처리 중..."
                  : news.isSubscribed
                  ? "구독 해제"
                  : "구독하기"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="flex items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          언론사가 없습니다.
        </div>
      )}
    </section>
  );
};

export default Grid;
