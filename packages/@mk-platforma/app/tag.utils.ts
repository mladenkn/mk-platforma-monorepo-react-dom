type getTagLabel_Tag = {
  value: string
  parent?: getTagLabel_Tag | null
}

export function getTagLabel(tag: getTagLabel_Tag): string {
  return tag.parent ?
    `${getTagLabel(tag.parent)} / ${tag.value}` :
    tag.value
}
