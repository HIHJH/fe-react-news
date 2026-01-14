import NewsTab from "@/features/news-contents/components/NewsTab";
import GridContainer from "@/features/news-contents/components/grid/GridContainer";
import List from "@/features/news-contents/components/list/List";
import { useReducer } from "react";
import {
  newsReducer,
  initialState,
} from "@/features/news-contents/store/newsReducer";
import { useFilterHandlers } from "@/features/news-contents/hooks/useFilterHandlers";

const NewsContents = () => {
  const [newsState, dispatch] = useReducer(newsReducer, initialState);
  const { handleNewsFilter, handleNewsViewMode } = useFilterHandlers(dispatch);

  const isGrid = newsState.viewMode === "grid";
  const isFiltered = newsState.filter === "subscribed";
  const ContentsComponent = isGrid ? GridContainer : List;

  return (
    <section>
      <NewsTab
        isGrid={isGrid}
        isFiltered={isFiltered}
        onFilterChange={handleNewsFilter}
        onViewChange={handleNewsViewMode}
      />
      <ContentsComponent isFiltered={isFiltered} />
    </section>
  );
};

export default NewsContents;
