import { Category } from "./data.types"

const sections = [
  {
    id: 1,
    label: "Smještaji",
    iconName: "accommodation" as Category,
    categories: ["accommodation"] as Category[],
  },
  {
    id: 4,
    label: "Poslovi",
    iconName: "job" as Category,
    categories: ["job"] as Category[],
  },
  {
    id: 3,
    label: "Radne akcije",
    iconName: "gathering" as Category,
    categories: ["gathering/work"] as Category[],
  },
  {
    id: 2,
    label: "Duhovna okupljanja",
    iconName: "gathering" as Category,
    categories: ["gathering/spirituality"] as Category[],
  },
  {
    id: 5,
    label: "Majstori",
    iconName: "personEndorsement" as Category,
    categories: ["personEndorsement"] as Category[],
  },
  {
    id: 6,
    label: "Nabava",
    iconName: "sellable" as Category,
    categories: ["sellable"] as Category[],
  },
  {
    id: 6,
    label: "Okupljanja/druženja",
    iconName: "gathering" as Category,
    categories: ["gathering/hangout"] as Category[],
  },
]

export type Section = (typeof sections)[number]

export default sections
