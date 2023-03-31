import { faker } from "@faker-js/faker"
import { comment_id_getNext } from "./data._utils"
import * as cro_dataset from "./data.cro.dataset"

export const avatarStyles = [
  { background: "green", color: "white" },
  { background: "yellow" },
  { background: "red", color: "white" },
  { background: "blue", color: "white" },
  { background: "orange" },
]

export function generateComment() {
  return {
    id: comment_id_getNext(),
    content: faker.lorem.paragraph(),
    author: {
      firstName: faker.helpers.arrayElement(cro_dataset.firstNames),
      lastName: faker.helpers.arrayElement(cro_dataset.lastNames),
      avatarStyle: faker.helpers.arrayElement(avatarStyles),
    },
    canEdit: true,
    canDelete: true,
  }
}
