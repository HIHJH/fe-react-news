import { getNewsstand } from "@/api/newsClient";
import { newsQueryKeys } from "@/api/newsQueryKeys";
import { useQuery } from "@tanstack/react-query";

// 뉴스스탠드 데이터 조회
export const useNewsstand = () => {
  return useQuery({
    queryKey: newsQueryKeys.newsstand(),
    queryFn: getNewsstand,
  });
};
