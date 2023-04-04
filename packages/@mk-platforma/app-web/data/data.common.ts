import { faker } from "@faker-js/faker"
import { comment_id_getNext } from "./data._utils"

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
      userName: faker.internet.userName(),
      avatarStyle: faker.helpers.arrayElement(avatarStyles),
    },
    canEdit: faker.helpers.arrayElement([false, false, false, true]),
    canDelete: faker.helpers.arrayElement([false, false, false, true]),
  }
}
