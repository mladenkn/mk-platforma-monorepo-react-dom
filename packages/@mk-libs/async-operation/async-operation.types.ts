export type AsyncOperationStatus = "NOT_INITIATED" | "PENDING" | "SUCCESS" | "FAILURE"

export type AsyncOperationSuccess<TData = void> = { status: "SUCCESS"; data: TData; error?: undefined | null }

export type AsyncOperationFailure = { status: "FAILURE"; error: unknown; data?: undefined | null }

export type AsyncOperation<TData = unknown> =
  | { status: "NOT_INITIATED"; data?: undefined | null; error?: undefined | null }
  | { status: "PENDING"; data?: undefined | null; error?: undefined | null }
  | AsyncOperationSuccess<TData>
  | AsyncOperationFailure
