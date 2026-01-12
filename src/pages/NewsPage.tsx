import Header from "@/news-stand/components/Header";
import RollingNews from "@/news-stand/components/rolling-news/RollingNews";

const NewsPage = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <div className="flex flex-col gap-8 w-[930px]">
          <Header />
          <RollingNews />
          {/* <NewsContents /> 추가 */}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
