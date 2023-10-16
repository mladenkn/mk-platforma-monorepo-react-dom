import env from "../env.mjs"
import { Drizzle_instance, drizzle_connect } from "./drizzle.utils"

const globalForDrizzle = global as unknown as {
  instance?: Drizzle_instance
}

const db_drizzle = globalForDrizzle.instance ?? drizzle_connect()[0]
export default db_drizzle

if (env.NODE_ENV !== "production") globalForDrizzle.instance = db_drizzle
