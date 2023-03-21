import { sortBy } from "lodash"
import { AsyncOperation, AsyncOperationFailure, AsyncOperationStatus, AsyncOperationSuccess } from "./async-operation.types"
import { UseQueryResult } from "@tanstack/react-query"


export function assertIsFailured<TData>(op: AsyncOperation<TData>): asserts op is AsyncOperationFailure {
  if(op.status !== 'FAILURE')
    throw new Error(`Expected AsyncOperation status to be FAILURE, but was ${op.status}`)
}

export function asFailured<TData>(op: AsyncOperation<TData>) {
  assertIsFailured(op)
  return op
}

export function assertIsSuccessfull<TData>(op: AsyncOperation<TData>): asserts op is AsyncOperationSuccess<TData> {
  if(op.status !== 'SUCCESS')
    throw new Error(`Expected AsyncOperation status to be SUCCESS, but was ${op.status}`)
}

export function asSuccessfull<TData>(loadable: AsyncOperation<TData>) {
  assertIsSuccessfull(loadable)
  return loadable
}

export function getDataOrFail<TData>(loadable: AsyncOperation<TData>) {
  assertIsSuccessfull(loadable)
  return loadable.data
}

export function mapData<TData, TDataMapped>(op: AsyncOperation<TData>, mapper: (v: TData) => TDataMapped): AsyncOperation<TDataMapped> {
  if(op.status === 'SUCCESS')
    return { status: 'SUCCESS', data: mapper(op.data) }
  else return op
}

export function mapQueryStatusToAsyncOpStatus(status: "error" | "idle" | "loading" | "success"): AsyncOperationStatus {
  switch (status){
    case 'error': return 'FAILURE'
    case 'idle': return 'NOT_INITIATED'
    case 'loading': return 'PENDING'
    case 'success': return 'SUCCESS'
  }
}

export function queryToAsyncOp<TData, TError = unknown>(query: UseQueryResult<TData, TError>){
  return {
    status: mapQueryStatusToAsyncOpStatus(query.status),
    data: query.data,
    error: query.error
  } as AsyncOperation<TData>
}

export function mutationToAsyncOp<TData, TError = unknown>(){
  // TODO
}

const allStatuses: AsyncOperationStatus[] = ['NOT_INITIATED', 'PENDING', 'SUCCESS', 'FAILURE']

export function takeTheLiestStatus(statuses: AsyncOperationStatus[]){
  const indexes = statuses.map(s => allStatuses.indexOf(s))
  const theLiestIndex = sortBy(indexes)[0]
  return allStatuses[theLiestIndex]
}
