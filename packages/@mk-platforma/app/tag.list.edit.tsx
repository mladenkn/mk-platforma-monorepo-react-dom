import { AsyncOperation } from "@mk-libs/async-operation/async-operation.types"
import { mapData } from "@mk-libs/async-operation/async-operation.utils"
import { withNoNils } from "@mk-libs/common/array"
import { assertIsNonNil } from "@mk-libs/common/common"
import useControllableState from "@mk-libs/react-common/use-controllable-state"
import useEffect from "@mk-libs/react-common/use-effect"
import TagsListEditPresenter, { TagsListEditPresenter_props, TagsListEdit_props_Tag } from "./tag.list.edit.presenter"
import { flatMap } from 'lodash'


type _SuggestedTag = TagsListEdit_props_Tag & { isNewTagSuggestion?: true }

type Props = Omit<TagsListEditPresenter_props, 'onChange'> & {
  maxSuggestionsDisplayed?: number
  doSuggestNewTags?: boolean
  withoutParents?: boolean
  createTag?(input: { value: string, parentId?: number }): Promise<TagsListEdit_props_Tag>
  findTag(value: string): TagsListEdit_props_Tag | null | undefined
  onChange(value: TagsListEdit_props_Tag[]): void
}

export default function TagListEdit({
  suggestions: _suggestions,
  maxSuggestionsDisplayed,
  doSuggestNewTags,
  search: props_search,
  withoutParents: props_withoutParents,
  setSearch: props_setSearch,
  createTag,
  findTag,
  onChange: _onChange,
  ...props
}: Props){  
  const [search, setSearch] = useControllableState(props_search || '', props_setSearch)

  useEffect(() => {
    if(props_withoutParents){
      const _withoutParents = withoutParents(props.value)
      if(_withoutParents.length !== props.value.length)
        _onChange(_withoutParents)
    }
  }, [], { runOnFirstRender: true })

  const suggestions: AsyncOperation<_SuggestedTag[]> = mapData(_suggestions, tags => {
    const filtered = tags.filter(t => t.value.toLowerCase().includes(search.toLowerCase()))
    if(filtered.length < 4 && !filtered.some(t => t.value === search) && doSuggestNewTags){
      return [
        ...filtered,
        {
          id: 0,
          value: search,
          isNewTagSuggestion: true
        }
      ]
    }
    else
      return filtered.slice(0, maxSuggestionsDisplayed)
  })

  function _createTag(value: string){
    assertIsNonNil(createTag)
    const indexOfSlash = value.indexOf(' / ')
    if(indexOfSlash > 2){
      const childValue = value.slice(indexOfSlash + 3)
      const parentTagValue = value.slice(0, indexOfSlash)
      const parentId = findTag(parentTagValue)?.id
      if(!parentId)
        console.error('Parent tag not found', value)
      else {
        return createTag({ parentId, value: childValue })
      }
    }
    else if (indexOfSlash > 0 && indexOfSlash < 3){
      console.error('Unexpected slash position')
      return undefined
    }
    else {
      return createTag({ value })
    }
  }

  const withNewTagsCreated = async (newValue: (string | TagsListEdit_props_Tag)[]) => {
    const withIds = await Promise.all(newValue.map(valueOrObj => {
      if (typeof valueOrObj === 'string')
        return _createTag(valueOrObj)
      else if (valueOrObj.id < 1)
        return _createTag(valueOrObj.value)
      else 
        return valueOrObj
    }))
    return withIds
  }

  function onChange(newValue: (string | TagsListEdit_props_Tag)[]){
    withNewTagsCreated(newValue)
      .then(withNoNils)
      .then(value => props_withoutParents ? withoutParents(value) : value)
      .then(_onChange)
      .then(() => setSearch(''))
  }

  return (
    <TagsListEditPresenter
      suggestions={suggestions}
      search={search}
      setSearch={setSearch}
      onChange={onChange}
      {...props}
    />
  )
}

function withoutParents(tags: TagsListEdit_props_Tag[]){
  const parents = flatMap(tags, getTagParents)
  return tags.filter(tag => !parents.includes(tag.id))
}

function getTagParents(tag: TagsListEdit_props_Tag){
  return withNoNils([tag.parent?.id, tag.parent?.parent?.id, tag.parent?.parent?.parent?.id])
}
