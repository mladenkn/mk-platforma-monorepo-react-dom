import BedIcon from "@mui/icons-material/Bed"
import React, { ComponentProps } from "react"
import Api from "~/api_/api.client"
import ConstructionIcon from "@mui/icons-material/Construction"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import ChairIcon from "@mui/icons-material/Chair"
import CheckroomIcon from "@mui/icons-material/Checkroom"
import HardwareIcon from "@mui/icons-material/Hardware"
import DevicesOtherIcon from "@mui/icons-material/DevicesOther"
import FoundationIcon from "@mui/icons-material/Foundation"
import HandymanIcon from "@mui/icons-material/Handyman"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"

const allIcons: Record<string, typeof ConstructionIcon> = {
  ConstructionIcon,
  Diversity3Icon,
  SelfImprovementIcon,
  FastfoodIcon,
  ChairIcon,
  CheckroomIcon,
  HardwareIcon,
  DevicesOtherIcon,
  FoundationIcon,
  HandymanIcon,
  EngineeringIcon,
  ShoppingCartIcon,
  GroupsIcon,
  BedIcon,
}

export function CategoryIcon({
  name,
  ...otherProps
}: { name: string } & ComponentProps<typeof BedIcon>) {
  console.log(39, name)
  const Icon = allIcons[name]
  console.log(40, Icon)
  return <Icon {...otherProps} />
}

// TODO: fetch single if category.many not cached
export function useCategory(id?: number) {
  const categoriesQuery = Api.category.many.useQuery()
  return {
    ...categoriesQuery,
    data: id ? categoriesQuery.data?.find(c => c.id === id) : null,
  }
}
