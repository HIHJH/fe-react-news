import type { NewsstandMapData } from "@/features/news-contents/hooks/useCompositeNewsstand";
import { useSubscriptionToggle } from "@/features/news-contents/hooks/useSubscriptionToggle";
import SubscriptionButton from "./SubscriptionButton";

type GridItem = NewsstandMapData[number];

type GridProps = {
  data: (GridItem | null)[];
};

const Grid = ({ data }: GridProps) => {
  const { isPending, handleToggle } = useSubscriptionToggle();

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
            <SubscriptionButton
              isSubscribed={news.isSubscribed}
              isPending={isPending}
              onToggle={() => handleToggle(news.pid, news.isSubscribed)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
