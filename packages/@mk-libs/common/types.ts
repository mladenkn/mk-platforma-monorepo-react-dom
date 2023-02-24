import { $ElementType } from "utility-types"

export type ObjectNoNulls<T> = {
  [P in keyof T]?: NonNullable<T[P]>
}

export type PromiseResult<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T

export type Partial<T> = {
  [P in keyof T]?: T[P] | null
}

export type Nil = undefined | null

export declare type DeepNilable<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? DeepNilableArray<U>
  : T extends object
  ? _DeepNilableObject<T>
  : T | undefined

export interface DeepNilableArray<T> extends Array<DeepNilable<T>> {}

export declare type _DeepNilableObject<T> = {
  [P in keyof T]?: DeepNilable<T[P]> | null
}

export type ArrayItem<T extends object> = $ElementType<T, number>

export type ValueOrMapValue<T> = T | ((curValue: T) => T)

export type Predicate<T> = (value: T) => boolean
