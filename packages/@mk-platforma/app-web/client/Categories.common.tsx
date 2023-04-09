import type { CategoryLabel } from "../data/data.types"
import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import { SxProps } from "@mui/material"
import { ComponentProps } from "react"

export function getCategoryLabel(category: CategoryLabel) {
  switch (category) {
    case "accommodation":
      return "Smještaji"
    case "sellable":
      return "Nabava"
    case "personEndorsement":
      return "Majstori"
    case "job":
      return "Poslovi"
    case "gathering":
      return "Okupljanja"
    case "gathering/spirituality":
      return "Duhovna okupljanja"
    case "gathering/work":
      return "Radne akcije"
    case "gathering/hangout":
      return "Druženja"
    default:
      throw new Error(`Parameter ${category} not matched as Category`)
  }
}

export function CategoryIcon({
  name,
  ...otherProps
}: { name: CategoryLabel } & ComponentProps<typeof BedIcon>) {
  switch (name) {
    case "accommodation":
      return <BedIcon {...otherProps} />
    case "sellable":
      return <ShoppingCartIcon {...otherProps} />
    case "personEndorsement":
      return <EngineeringIcon {...otherProps} />
    case "job":
      return <HandymanIcon {...otherProps} />
    case "gathering":
      return <GroupsIcon {...otherProps} />
    case "gathering/spirituality":
      return <GroupsIcon {...otherProps} />
    case "gathering/work":
      return <GroupsIcon {...otherProps} />
    case "gathering/hangout":
      return <GroupsIcon {...otherProps} />
    default:
      throw new Error(`Parameter ${name} not matched as Category`)
  }
}

export const allCategories: CategoryLabel[] = [
  "job",
  "accommodation",
  "gathering",
  "personEndorsement",
  "sellable",
  "gathering/spirituality",
  "gathering/work",
  "gathering/hangout",
]
