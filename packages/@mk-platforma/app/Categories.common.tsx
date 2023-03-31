import type { Category } from "../api/data/data.types"
import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import { SxProps } from "@mui/material"

export function getCategoryLabel(category: Category) {
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
      throw new Error("Category name not matched")
  }
}

export function CategoryIcon({ name, sx }: { name: Category; sx?: SxProps }) {
  switch (name) {
    case "accommodation":
      return <BedIcon sx={sx} />
    case "sellable":
      return <ShoppingCartIcon sx={sx} />
    case "personEndorsement":
      return <EngineeringIcon sx={sx} />
    case "job":
      return <HandymanIcon sx={sx} />
    case "gathering":
      return <GroupsIcon sx={sx} />
    case "gathering/spirituality":
      return <GroupsIcon sx={sx} />
    case "gathering/work":
      return <GroupsIcon sx={sx} />
    case "gathering/hangout":
      return <GroupsIcon sx={sx} />
    default:
      throw new Error("Category name not matched")
  }
}

export const allCategories: Category[] = [
  "job",
  "accommodation",
  "gathering",
  "personEndorsement",
  "sellable",
  "gathering/spirituality",
  "gathering/work",
  "gathering/hangout",
]
