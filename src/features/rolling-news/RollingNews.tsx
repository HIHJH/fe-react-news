import { useRef, useState } from "react";

interface NewsItem {
  pressName: string;
  title: string;
  url: string;
}

const defaultNewsList: NewsItem[] = [
  {
    pressName: "연합뉴스",
    title: "롤링 안함",
    url: "#",
  },
  {
    pressName: "서울경제",
    title: "롤링 안함",
    url: "#",
  },
];

const NewsContent = ({ item }: { item: NewsItem }) => (
  <a
    href={item.url}
    className="flex items-center gap-4 w-full h-full text-gray-700 no-underline transition-colors duration-200 hover:text-black group"
  >
    <strong className="text-sm font-bold flex-shrink-0 whitespace-nowrap text-black">
      {item.pressName}
    </strong>
    <span className="text-sm font-normal truncate group-hover:underline">
      {item.title}
    </span>
  </a>
);

const RollingColumn = ({ items }: { items: NewsItem[]; }) => {
  const [currentIndex] = useState(0);
  const [isAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const currentItem = items[currentIndex % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];

  return (
    <div
      ref={containerRef}
      className="flex-1 h-[49px] overflow-hidden bg-gray-50 border border-gray-200 px-4 relative"
    >
      <div className="relative w-full h-full">
        {/* Current Item */}
        <div
          className={`absolute left-0 w-full h-full flex items-center transition-transform duration-500 ease-in-out ${isAnimating ? "-translate-y-full" : "translate-y-0"
            }`}
          style={{ top: 0 }}
        >
          <NewsContent item={currentItem} />
        </div>

        {/* Next Item */}
        <div
          className={`absolute left-0 w-full h-full flex items-center transition-transform duration-500 ease-in-out ${isAnimating ? "-translate-y-full" : "translate-y-0"
            }`}
          style={{ top: "100%" }}
        >
          <NewsContent item={nextItem} />
        </div>
      </div>
    </div>
  );
};

const RollingNews = () => {
  const midPoint = Math.ceil(defaultNewsList.length / 2);
  const leftList = defaultNewsList.slice(0, midPoint);
  const rightList = defaultNewsList.slice(midPoint);

  return (
    <section className="flex w-full gap-3 mb-8">
      <RollingColumn items={leftList} />
      <RollingColumn items={rightList} />
    </section>
  );
};

export default RollingNews;
