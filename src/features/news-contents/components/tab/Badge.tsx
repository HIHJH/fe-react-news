import { useSubscription } from "@/features/news-contents/hooks/useSubscription";

const Badge = () => {
  const { data } = useSubscription();
  const subscribedCount = data?.pids.length ?? 0;

  return (
    <div className="absolute right-[-28px] w-6 h-6 rounded-[8px] flex justify-center items-center bg-(--color-surface-brand-alt)">
      <span className="typo-display-medium-12 text-white-default">
        {subscribedCount}
      </span>
    </div>
  );
};

export default Badge;
