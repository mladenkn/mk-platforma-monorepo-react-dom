import { customType } from "drizzle-orm/pg-core"
import { ZodEnum, ZodTypeAny } from "zod"

export function enum_type(zodEnum: ZodEnum<any>) {
  return customType<{
    data: string
    driverData: string
  }>({
    dataType() {
      return "text"
    },
    toDriver(value) {
      zodEnum.parse(value)
      return value
    },
    fromDriver(value) {
      return zodEnum.parse(value)
    },
  })
}

export function stringJson_type<T>(zodType: ZodTypeAny) {
  return customType<{
    data: T
    driverData: string
  }>({
    dataType() {
      return "string"
    },
    toDriver(data) {
      zodType.parse(data)
      return JSON.stringify(data)
    },
    fromDriver(data) {
      const asJson = JSON.parse(data)
      return zodType.parse(asJson) as T
    },
  })
}
