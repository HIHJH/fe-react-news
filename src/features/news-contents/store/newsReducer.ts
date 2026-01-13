type NewsFilter = "all" | "subscribed";
type NewsViewMode = "grid" | "list";

export type NewsState = {
  filter: NewsFilter;
  viewMode: NewsViewMode;
};

export type NewsAction =
  | { type: "SET_FILTER"; payload: NewsFilter }
  | { type: "SET_VIEW_MODE"; payload: NewsViewMode };

export const initialState: NewsState = {
  filter: "all",
  viewMode: "grid",
};

export const newsReducer = (
  state: NewsState,
  action: NewsAction
): NewsState => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    default:
      return state;
  }
};
