import { lowerFirst } from "lodash"
import path from "path"
import fs from 'fs'
import { getCreateCodeForModel, getFindManyCodeForModel, getUpdateCodeForModel } from "./generator.operations"


export default function generateDbAccessors(models: string[], savePath_root: string){
  for (const model of models) {
    const fullPathForModel = path.join(savePath_root, lowerFirst(model) + '.ts')
    const modelCode = getModelCode(model)
    fs.writeFileSync(fullPathForModel, modelCode)
  }
}

function getModelCode(model: string){
  const lines = [
    'import { Prisma } from "@prisma/client"',
    'import { ApiContext } from "@mk-docs/api/context"',
    'import { z, ZodType } from "zod"',
    '',
    '',
    `${getFindManyCodeForModel(model)}`,
    '',
    `${getCreateCodeForModel(model)}`,
    '',
    `${getUpdateCodeForModel(model)}`,
    '',
  ]
  return lines.join('\n')
}

