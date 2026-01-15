import { useEffect, useRef, useState } from "react";

// Types
interface NewsItem {
  pressName: string;
  title: string;
  url: string;
}

// Default Data (Expanded to ensure sufficient items for scrolling)
const defaultNewsList: NewsItem[] = [
  {
    pressName: "연합뉴스",
    title: "[속보] 도심 공원 '조용한 독서존' 시범 운영... 시민 호응 이어져",
    url: "#",
  },
  {
    pressName: "서울경제",
    title: "착한 소비 캠페인, 지역 상권 회복에 긍정적 영향",
    url: "#",
  },
  {
    pressName: "한국일보",
    title: "동네 서점의 변신, 문화 복합 공간으로 자리매김",
    url: "#",
  },
  {
    pressName: "매일경제",
    title: "소상공인 지원 정책 실효성 논란... 현장의 목소리는?",
    url: "#",
  },
  {
    pressName: "동아일보",
    title: "AI 기술, 일상 생활 속으로... 편리함과 우려 공존",
    url: "#",
  },
  {
    pressName: "조선일보",
    title: "주말 날씨: 맑고 포근... 나들이하기 좋은 날씨",
    url: "#",
  },
  {
    pressName: "중앙일보",
    title: "MZ세대, 가치 소비 트렌드 확산... 기업 마케팅 변화",
    url: "#",
  },
  {
    pressName: "경향신문",
    title: "도심 속 녹지 공간 확충 필요성 제기... 시민 단체 성명",
    url: "#",
  },
  {
    pressName: "한겨레",
    title: "지속 가능한 도시를 위한 시민들의 작은 실천",
    url: "#",
  },
  {
    pressName: "국민일보",
    title: "자전거 출퇴근 족 증가... 도로 안전 대책 시급",
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

const RollingColumn = ({ items }: { items: NewsItem[]; trigger: number }) => {
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
          className={`absolute left-0 w-full h-full flex items-center transition-transform duration-500 ease-in-out ${
            isAnimating ? "-translate-y-full" : "translate-y-0"
          }`}
          style={{ top: 0 }}
        >
          <NewsContent item={currentItem} />
        </div>

        {/* Next Item */}
        <div
          className={`absolute left-0 w-full h-full flex items-center transition-transform duration-500 ease-in-out ${
            isAnimating ? "-translate-y-full" : "translate-y-0"
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
  const [leftTrigger, setLeftTrigger] = useState(0);
  const [rightTrigger, setRightTrigger] = useState(0);

  // Split data
  const midPoint = Math.ceil(defaultNewsList.length / 2);
  const leftList = defaultNewsList.slice(0, midPoint);
  const rightList = defaultNewsList.slice(midPoint);

  useEffect(() => {
    const LOOP_DURATION = 5000;
    const SLAVE_LAG = 1000;

    const runCycle = () => {
      setLeftTrigger((prev) => prev + 1);
      setTimeout(() => {
        setRightTrigger((prev) => prev + 1);
      }, SLAVE_LAG);
    };

    const timer = setInterval(runCycle, LOOP_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex w-full gap-3 mb-8">
      <RollingColumn items={leftList} trigger={leftTrigger} />
      <RollingColumn items={rightList} trigger={rightTrigger} />
    </section>
  );
};

export default RollingNews;
