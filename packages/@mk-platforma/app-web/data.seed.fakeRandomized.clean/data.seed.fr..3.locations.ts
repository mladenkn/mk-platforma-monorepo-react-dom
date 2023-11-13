import { Drizzle_instance } from "~/drizzle/drizzle.instance"
import locations_json from "~/data.seed.common/data.locations.json"
import { Location } from "~/domain/post/Post.schema"

export default function seedLocations(db: Drizzle_instance) {
  const mapped = locations_json.map(l => ({ ...l, googleId: l.google_id }))
  return db.insert(Location).values(mapped).returning() // TODO: fali onConflictDoUpdate
}
