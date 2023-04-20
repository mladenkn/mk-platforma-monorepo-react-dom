import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import React, { ComponentProps } from "react"
import type { Post_category_labelType } from "../prisma/generated/zod"
import Api from "./trpc.client"
import ConstructionIcon from "@mui/icons-material/Construction"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import ChairIcon from "@mui/icons-material/Chair"
import CheckroomIcon from "@mui/icons-material/Checkroom"
import HardwareIcon from "@mui/icons-material/Hardware"
import DevicesOtherIcon from "@mui/icons-material/DevicesOther"
import FoundationIcon from "@mui/icons-material/Foundation"

export function getCategoryLabel(category: Post_category_labelType) {
  switch (category) {
    case "accommodation":
      return "Smještaji"
    case "sellable":
      return "Nabava"
    case "expertEndorsement":
      return "Majstori"
    case "job":
      return "Poslovi"
    case "gathering":
      return "Okupljanja"
    case "gathering_spirituality":
      return "Duhovna okupljanja"
    case "gathering_work":
      return "Radne akcije"
    case "gathering_hangout":
      return "Druženja"
    case "sellable_food":
      return "Hrana"
    case "sellable_clothes":
      return "Odjeća"
    case "sellable_furniture":
      return "Namještaj"
    case "sellable_tool":
      return "Alat"
    case "sellable_gadget":
      return "Gadgeti"
    case "sellable_buildingMaterial":
      return "Građevinski materijal"
    default:
      throw new Error(`Parameter ${category} not matched as Category`)
  }
}

export function CategoryIcon({
  name,
  ...otherProps
}: { name: Post_category_labelType } & ComponentProps<typeof BedIcon>) {
  switch (name) {
    case "accommodation":
      return <BedIcon {...otherProps} />
    case "sellable":
      return <ShoppingCartIcon {...otherProps} />
    case "sellable_food":
      return <FastfoodIcon {...otherProps} />
    case "sellable_clothes":
      return <CheckroomIcon {...otherProps} />
    case "sellable_furniture":
      return <ChairIcon {...otherProps} />
    case "sellable_tool":
      return <HardwareIcon {...otherProps} />
    case "sellable_gadget":
      return <DevicesOtherIcon {...otherProps} />
    case "sellable_buildingMaterial":
      return <FoundationIcon {...otherProps} />
    case "expertEndorsement":
      return <EngineeringIcon {...otherProps} />
    case "job":
      return <HandymanIcon {...otherProps} />
    case "gathering":
      return <GroupsIcon {...otherProps} />
    case "gathering_spirituality":
      return <SelfImprovementIcon {...otherProps} />
    case "gathering_work":
      return <ConstructionIcon {...otherProps} />
    case "gathering_hangout":
      return <Diversity3Icon {...otherProps} />
    default:
      throw new Error(`Parameter ${name} not matched as Category`)
  }
}

// TODO: fetch single if category.many not cached
export function useCategory(id?: number) {
  const categoriesQuery = Api.post.category.many.useQuery()
  return {
    ...categoriesQuery,
    data: id ? categoriesQuery.data?.find(c => c.id === id) : null,
  }
}
