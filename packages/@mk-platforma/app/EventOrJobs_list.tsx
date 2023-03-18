import data from "./data.json"
import Section_base from "./Section.base"
import { EventOrJob_list_ItemDetails, EventOrJob_list_item } from "./EventOrJob"


const { jobs } = data

type Item = {
  id: number
  label: string
  location: string
  photos: string[]
  description: string
  adOwner: {
    phoneNumber: string
  }
}

type Props = {
  items: Item[]
}

export default function EventOrJobs_list({ items }: Props) {
  return (
    <Section_base
      items={items}
      renderListItem={item => <EventOrJob_list_item {...item} />}
      renderDetails={item => <EventOrJob_list_ItemDetails {...item} />}
    />
  )
}
