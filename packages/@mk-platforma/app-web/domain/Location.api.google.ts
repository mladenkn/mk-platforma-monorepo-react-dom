import { Client } from "@googlemaps/google-maps-services-js"
import { asNonNil } from "@mk-libs/common/common"
import { Prisma } from "@prisma/client"

const key = "AIzaSyAlZmjA7GGwjG2A6b2lo6RmWE5FbIKu8eQ"

export default function Location_api_google_create() {
  const client = new Client({})

  async function search(query: string) {
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

  async function details(id: string) {
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
      country,
      adminAreaLevel1,
    }
  }

  return {
    search,
    details,
  }
}
