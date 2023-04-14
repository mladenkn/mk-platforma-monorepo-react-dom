import HandymanIcon from "@mui/icons-material/Handyman"
import BedIcon from "@mui/icons-material/Bed"
import EngineeringIcon from "@mui/icons-material/Engineering"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import GroupsIcon from "@mui/icons-material/Groups"
import React, { ComponentProps } from "react"
import type { Post_category_labelType } from "../prisma/generated/zod"
import Api from "./trpc.client"

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
    case "expertEndorsement":
      return <EngineeringIcon {...otherProps} />
    case "job":
      return <HandymanIcon {...otherProps} />
    case "gathering":
      return <GroupsIcon {...otherProps} />
    case "gathering_spirituality":
      return <GroupsIcon {...otherProps} />
    case "gathering_work":
      return <GroupsIcon {...otherProps} />
    case "gathering_hangout":
      return <GroupsIcon {...otherProps} />
    default:
      throw new Error(`Parameter ${name} not matched as Category`)
  }
}

// TODO: fetch single if category.many not cached
export function useCategory(id?: number) {
  const categoriesQuery = Api.post.category.many.useQuery()
  return {
    ...categoriesQuery,
    data: categoriesQuery.data?.find(c => c.id === id),
  }
}
