import data from "./data.json"
import Section_base from "./Section.base"
import { EventOrJob_list_ItemDetails, EventOrJob_list_item } from "./EventOrJob"

const { jobs } = data


export default function Job_offers() {
  return (
    <Section_base
      items={jobs}
      renderListItem={item => <EventOrJob_list_item {...item} />}
      renderDetails={item => <EventOrJob_list_ItemDetails {...item} />}
    />
  )
}
