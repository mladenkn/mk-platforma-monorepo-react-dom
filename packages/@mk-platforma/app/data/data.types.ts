export type Post_base = {
  id: number
  label: string
  description: string
  location: string
  photos: string[]
  phoneNumber: string
}

export type Category = "job" | "accommodation" | "personEndorsement" | "sellable" | "gathering"
