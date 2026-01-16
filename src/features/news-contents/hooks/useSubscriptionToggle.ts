import { useSubscribe } from "./useSubscribe";
import { useUnsubscribe } from "./useUnsubscribe";

export const useSubscriptionToggle = () => {
  const { mutate: subscribe, isPending: isSubscribePending } = useSubscribe();
  const { mutate: unSubscribe, isPending: isUnsubscribePending } =
    useUnsubscribe();

  const isPending = isSubscribePending || isUnsubscribePending;

  const handleToggle = (pid: string, isSubscribed: boolean) => {
    if (isSubscribed) {
      unSubscribe(pid);
    } else {
      subscribe(pid);
    }
  };

  return {
    isPending,
    handleToggle,
  };
};
