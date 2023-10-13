import { customType } from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./drizzle.schema"
import env from "~/env.mjs"
import { getConnectionString } from "~/cli.utils"
import { ZodEnum, ZodTypeAny } from "zod"

export function drizzle_connect() {
  const queryClient = postgres(env.DATABASE_URL || getConnectionString("dev"), {
    // TODO: mora radit bez defaulta
    ssl: "require",
    max: 1,
  })
  const db = drizzle(queryClient, { schema })
  return [db, queryClient] as const
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>[0]

export function enum_type(zodEnum: ZodEnum<any>) {
  return customType<{
    data: string
    driverData: string
  }>({
    dataType() {
      return "text"
    },
    toDriver(value: string) {
      zodEnum.parse(value)
      return value
    },
    fromDriver(value: string) {
      return zodEnum.parse(value)
    },
  })
}

export function stringJson_type(zodType: ZodTypeAny) {
  return customType<{
    data: string
    driverData: string
  }>({
    dataType() {
      return "string"
    },
    toDriver(data: string) {
      const asJson = JSON.parse(data)
      zodType.parse(asJson)
      return data
    },
    fromDriver(data: string) {
      const asJson = JSON.parse(data)
      return zodType.parse(asJson)
    },
  })
}
