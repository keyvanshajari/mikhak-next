export interface IResponseRequest {
  status: number;
  data: { [key: string]: any } | { [key: string]: any }[] | null;
  message: string;
}

export interface IErrorResponseRequest {
  status?: number;
  data?: { [key: string]: any } | { [key: string]: any }[] | null | undefined;
  message?: string;
}

export interface ISuccessResponseRequest {
  status?: number;
  data?: { [key: string]: any } | { [key: string]: any }[] | null | undefined;
  message?: string;
}
export interface IClientResponse<T> {
  data: T;
  status?: number | null;
  message?: null | string;
}

export interface IClientResponseState<T> extends IClientResponse<T> {
  state: IFetchingStates;
}

export enum FETCHING_STATES {
  IDLE = "IDLE",
  READY = "READY", // its mean that we have success fetched data, and we can render it
  FAILED = "FAILED", // its mean that we can't fetch data, and we need to show some stub component
  FETCHING = "FETCHING", // we should show a spinner.
  UPDATING = "UPDATING", // we need disable related inputs and save button, and show some spinner in the button,
  DELETING = "DELETING",
}

export type IFetchingStates =
  | FETCHING_STATES.IDLE
  | FETCHING_STATES.READY
  | FETCHING_STATES.FAILED
  | FETCHING_STATES.FETCHING
  | FETCHING_STATES.DELETING
  | FETCHING_STATES.UPDATING;
