import type { LoadingState } from "./types";

export function reflectSubscribeButtonLabel(options: {
  isReflectPlan: boolean;
  isSubscribedToHigherTier: boolean;
  loading: LoadingState;
}): string {
  if (options.isSubscribedToHigherTier) {
    return "Included in your plan";
  }
  if (options.isReflectPlan) {
    return "Your current plan";
  }
  if (options.loading === "reflect") {
    return "Redirecting…";
  }
  return "Subscribe to Reflect";
}

export function initiateSubscribeButtonLabel(options: {
  isInitiatePlan: boolean;
  loading: LoadingState;
  isUpgradeFromReflect: boolean;
}): string {
  if (options.isInitiatePlan) {
    return "Your current plan";
  }
  if (options.loading === "initiate") {
    return "Redirecting…";
  }
  if (options.isUpgradeFromReflect) {
    return "Upgrade to Initiate";
  }
  return "Subscribe to Initiate";
}
