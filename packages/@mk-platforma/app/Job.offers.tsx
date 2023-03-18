import data from "./data.json"
import Section_base from "./Section.base"
import { EventOrJob_details, EventOrJob_listItem } from "./EventOrJob"

const { jobs } = data


export default function Job_offers() {
  return (
    <Section_base
      items={jobs}
      renderListItem={item => <EventOrJob_listItem {...item} />}
      renderDetails={item => <EventOrJob_details {...item} />}
    />
  )
}
