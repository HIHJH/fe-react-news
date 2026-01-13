import NewsPageLayout from "@/layout/NewsPageLayout";
import NewsContents from "@/features/news-contents/NewsContents";
import RollingNews from "@/features/rolling-news/RollingNews";

const NewsPage = () => {
  return (
    <NewsPageLayout>
      <RollingNews />
      <NewsContents />
    </NewsPageLayout>
  );
};

export default NewsPage;
