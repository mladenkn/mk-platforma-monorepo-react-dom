import { drizzle_connect } from "./drizzle.utils"

const db_drizzle = drizzle_connect()[0]
export default db_drizzle
