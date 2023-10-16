import { drizzle_connect } from "./drizzle.utils"

export const db_drizzle = drizzle_connect()[0]
