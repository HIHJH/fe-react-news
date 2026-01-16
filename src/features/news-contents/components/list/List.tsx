import type { NewsstandPress } from "@/api/api";
import SubscriptionButton from "@/features/news-contents/components/grid/SubscriptionButton";

interface ListViewProps {
  pressData?: NewsstandPress;
  isSubscribed?: boolean;
  onSubscriptionToggle?: (pid: string, isSubscribed: boolean) => void;
  isPending?: boolean;
}

const List = ({
  pressData,
  isSubscribed,
  onSubscriptionToggle,
  isPending,
}: ListViewProps) => {
  if (!pressData) {
    return (
      <div className="p-6 min-h-[300px] flex flex-col justify-between">
        <div className="flex items-center justify-center p-10 text-default">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-[300px] flex flex-col justify-between">
      <div className="flex items-center gap-4 mb-6">
        {(pressData.logoLight?.url || pressData.logoDark?.url) && (
          <img
            src={pressData.logoLight?.url || pressData.logoDark?.url}
            alt={pressData.name}
            className="h-6 object-contain"
          />
        )}
        {!pressData.logoLight && !pressData.logoDark && (
          <span className="typo-display-bold-16 text-strong">
            {pressData.name}
          </span>
        )}

        <span className="text-default text-xs">{pressData.regDate} 편집</span>
        <SubscriptionButton
          isSubscribed={isSubscribed || false}
          isPending={isPending || false}
          variant="list"
          onToggle={() =>
            onSubscriptionToggle?.(pressData.pid, isSubscribed || false)
          }
        />
      </div>

      <div className="flex gap-6 h-full">
        <div className="w-[40%] flex flex-col gap-3 cursor-pointer group">
          {pressData.materials[0] && (
            <div
              onClick={() => {
                if (pressData.materials[0].url) {
                  window.open(pressData.materials[0].url, "_blank");
                }
              }}
            >
              <div className="w-full aspect-video overflow-hidden rounded bg-surface-alt border border-default">
                {pressData.materials[0].image ? (
                  <img
                    src={pressData.materials[0].image.url}
                    alt={pressData.materials[0].title}
                    className="w-full h-full object-cover transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-weak">
                    No Image
                  </div>
                )}
              </div>
              <div className="typo-display-medium-16 text-strong group-hover:underline line-clamp-2 mt-3">
                {pressData.materials[0].title}
              </div>
            </div>
          )}
        </div>

        <div className="w-[60%] flex flex-col justify-between">
          <ul className="flex flex-col gap-3">
            {pressData.materials.slice(1, 7).map((article) => (
              <li
                key={article.aid}
                className="typo-available-medium-16 text-bold hover:underline cursor-pointer truncate"
                onClick={() => {
                  if (article.url) {
                    window.open(article.url, "_blank");
                  }
                }}
              >
                {article.title}
              </li>
            ))}
          </ul>
          <div className="text-weak text-xs mt-4">
            {pressData.name} 언론사에서 직접 편집한 뉴스입니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
