export interface UnsubscriptionResult {
  success: boolean;
  message: string;
  pid?: string;
  name?: string;
  pressType?: "major" | "minor" | "subs" | null;
  logoLight?: Logo;
  logoDark?: Logo;
}

export interface ApiEndpoints {
  "/api/newsstand": {
    GET: NewsstandList;
  };
  "/api/newsstand/{pid}": {
    GET: NewsstandPress;
  };
  "/api/subscribe": {
    GET: SubscriptionList;
  };
  "/api/subscribe/{pid}": {
    POST: SubscriptionResult;
    DELETE: UnsubscriptionResult;
  };
  "/api/rolling": {
    GET: RollingNews;
  };
}

export type Endpoint = keyof ApiEndpoints;
export type Method<T extends Endpoint> = keyof ApiEndpoints[T];
export type Response<
  T extends Endpoint,
  M extends Method<T>
> = ApiEndpoints[T][M];


export interface Logo {
  url: string;
}

export interface PressInfo {
  pid: string;
  name: string;
  pressType: "major" | "minor" | "subs" | null;
  logoLight: Logo;
  logoDark: Logo;
  showThumbnailView?: boolean;
  showListView?: boolean;
  excludeInPaging?: boolean;
  positionForPaging?: number;
  realtime?: boolean;
  regDate?: string;
}

export interface CategoryInfo {
  label: string;
  pids: string[];
  count: number;
}

export interface NewsstandList {
  blocks: PressInfo[];
  totalCount: number;
  catePidList: CategoryInfo[];
}

export interface Article {
  "@type"?: string;
  gdid?: string | null;
  title?: string;
  url?: string;
  aid?: string | null;
  image?: Logo | null;
  _id?: string;
}

export interface NewsstandPress extends PressInfo {
  materials: Article[];
  materialsCount: number;
}

export interface SubscriptionList {
  pids: string[];
  count: number;
}

export interface SubscriptionResult {
  success: boolean;
  message: string;
  pid?: string;
  name?: string;
  pressType?: "major" | "minor" | "subs" | null;
  logoLight?: Logo;
  logoDark?: Logo;
  subscribedAt?: number;
}

export interface RollingNewsItem extends Record<string, unknown> { }

export interface RollingNews {
  left: RollingNewsItem[];
  right: RollingNewsItem[];
}
