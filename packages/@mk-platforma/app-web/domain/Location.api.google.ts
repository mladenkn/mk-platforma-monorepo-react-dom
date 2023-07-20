import { Client } from "@googlemaps/google-maps-services-js"
import { asNonNil } from "@mk-libs/common/common"
import { Prisma } from "@prisma/client"

const key = "AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ"
const client = new Client({})

export async function location_api_google__search(query: string) {
  return await client
    .textSearch({
      params: {
        query: query,
        key,
      },
    })
    .then(r =>
      r.data.results
        .filter(
          p =>
            p.place_id &&
            p.geometry?.location.lng &&
            p.geometry?.location.lat &&
            p.name &&
            p.types?.includes("locality" as any)
        )
        .map(p => ({
          google_id: asNonNil(p.place_id),
          name: asNonNil(p.name),
          longitude: new Prisma.Decimal(p.geometry?.location.lng!),
          latitude: new Prisma.Decimal(p.geometry?.location.lat!),
        }))
    )
}

export async function location_api_google__details(id: string) {
  const details = await client
    .placeDetails({
      params: {
        key,
        place_id: id,
      },
    })
    .then(r => r.data.result)

  const country = asNonNil(
    details.address_components?.find(c => c.types.includes("country" as any))?.long_name
  )
  const adminAreaLevel1 = details.address_components?.find(c =>
    c.types.includes("administrative_area_level_1" as any)
  )?.long_name

  return {
    google_id: asNonNil(details.place_id),
    name: asNonNil(details.name),
    longitude: new Prisma.Decimal(details.geometry?.location.lng!),
    latitude: new Prisma.Decimal(details.geometry?.location.lat!),
    country,
    adminAreaLevel1,
  }
}
