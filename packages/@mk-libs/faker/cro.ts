import * as cro from "./cro.dataset"
import { randomArrayItem } from "./helpers"


const Mk_faker_cro = {
  firstName: () => randomArrayItem(cro.firstNames),
  lastName: () => randomArrayItem(cro.lastNames),
  job: () => randomArrayItem(cro.jobs),
}

export default Mk_faker_cro
