import generatePosts from "./data.generate"
import { writeFileSync } from "fs"

const allPosts = generatePosts()

writeFileSync("./data/data.json", JSON.stringify({ allPosts }, null, 2))
