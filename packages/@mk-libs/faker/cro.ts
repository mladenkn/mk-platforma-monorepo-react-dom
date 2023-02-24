import { firstNames, lastNames } from "./cro.dataset"
import { randomArrayItem } from "./helpers"


const Mk_faker_cro = {
  firstName: () => randomArrayItem(firstNames),
  lastName: () => randomArrayItem(lastNames)
}

export default Mk_faker_cro
