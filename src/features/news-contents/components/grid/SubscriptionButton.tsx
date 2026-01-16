import PlusIcon from "@/assets/icons/plus.svg?react";
import CrossIcon from "@/assets/icons/cross.svg?react";

interface SubscriptionButtonProps {
  isSubscribed: boolean;
  isPending: boolean;
  onToggle: () => void;
  variant?: "grid" | "list";
}

const SubscriptionButton = ({
  isSubscribed,
  isPending,
  onToggle,
  variant = "grid",
}: SubscriptionButtonProps) => {
  const isGrid = variant === "grid";

  const baseClass =
    "cursor-pointer rounded-full text-xs flex items-center justify-center gap-0.5 transition-colors";

  const variantClass = isGrid
    ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-6 bg-white border border-gray-200 text-gray-500 font-medium opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none duration-200 hover:bg-gray-50 whitespace-nowrap z-10"
    : "h-6 px-2 btn-outline opacity-100 hover:bg-surface-alt";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`${baseClass} ${variantClass}`}
      aria-label={isSubscribed ? "해지하기" : "구독하기"}
      disabled={isPending}
    >
      {isSubscribed ? (
        <>
          <CrossIcon className="w-3 text-weak" />
          {isGrid && "해지하기"}
        </>
      ) : (
        <>
          <PlusIcon className="w-3 text-weak" />
          구독하기
        </>
      )}
    </button>
  );
};

export default SubscriptionButton;
