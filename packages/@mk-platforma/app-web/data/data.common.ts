import { generateArray } from "@mk-libs/common/common"

export const avatarStyles = [
  { background: "green", color: "white" },
  { background: "yellow" },
  { background: "red", color: "white" },
  { background: "blue", color: "white" },
  { background: "orange" },
]

export function generateComment() {
  return {
    content: generateArray(() => "komentar ", 20).join(""),
  }
}
