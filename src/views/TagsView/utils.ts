import type { Option } from "@components/TagSelect"
import type { Tag } from "@src/api/tags/useTagsQuery"

export const mapTagToOption = (tags: Tag[] | undefined): Option[] =>
  (tags ?? [])?.map((tag) => ({
    optionKey: tag.id,
    label: tag.title,
    extraText: `+${tag.occurrence}`,
  }))

export const mapOptionToTag = (options: Option[] | undefined): Tag[] =>
  (options ?? []).map((option) => ({
    id: option.optionKey as number,
    title: option.label,
    occurrence: +(option.extraText ?? 0),
  }))
