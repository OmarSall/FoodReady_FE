export enum ViewStateKind {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export type OrderTrackingErrorViewState = {
  kind: ViewStateKind.ERROR;
  message: string;
  canRetry: boolean;
};
