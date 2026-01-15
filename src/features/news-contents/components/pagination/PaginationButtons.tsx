import LeftArrowIcon from "@/assets/icons/left_arrow.svg?react";
import RightArrowIcon from "@/assets/icons/right_arrow.svg?react";

interface PaginationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  isDisabled?: {
    prev?: boolean;
    next?: boolean;
  };
  ariaLabels?: {
    prev?: string;
    next?: string;
  };
}

const PaginationButtons = ({
  onNext,
  onPrev,
  isDisabled = {},
  ariaLabels = {
    prev: "이전",
    next: "다음",
  },
}: PaginationButtonsProps) => {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={isDisabled.prev}
        className="absolute top-1/2 -left-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center disabled:invisible opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label={ariaLabels.prev}
      >
        <LeftArrowIcon />
      </button>

      <button
        onClick={onNext}
        disabled={isDisabled.next}
        className="absolute top-1/2 -right-[72px] -translate-y-1/2 w-6 h-10 flex items-center justify-center disabled:invisible opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label={ariaLabels.next}
      >
        <RightArrowIcon />
      </button>
    </>
  );
};

export default PaginationButtons;
