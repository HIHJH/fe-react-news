import NewsTab from "@/features/news-contents/components/NewsTab";
import GridContainer from "@/features/news-contents/components/grid/GridContainer";
import List from "@/features/news-contents/components/list/List";
import { useState } from "react";

export type NewsViewMode =
  | "GRID_ALL"
  | "GRID_SUBSCRIBED"
  | "LIST_ALL"
  | "LIST_SUBSCRIBED";

export type NewsState = {
  viewMode: NewsViewMode;
};

const NewsContents = () => {
  const [viewMode, setViewMode] = useState<NewsViewMode>("GRID_ALL");

  const isGrid = viewMode === "GRID_ALL" || viewMode === "GRID_SUBSCRIBED";
  const isFiltered =
    viewMode === "GRID_SUBSCRIBED" || viewMode === "LIST_SUBSCRIBED";

  const ContentsComponent = isGrid ? GridContainer : List;

  const handleViewModeChange = (newMode: NewsViewMode) => {
    setViewMode(newMode);
  };

  return (
    <section>
      <NewsTab viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      <ContentsComponent isFiltered={isFiltered} />
    </section>
  );
};

export default NewsContents;
