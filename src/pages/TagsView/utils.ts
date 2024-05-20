import type { Option } from "@components/TagSelect"
import type { Tag } from "@src/api/tags/useTagsQuery"

export const mapTagToOption = (tags: Tag[] | undefined): Option[] | undefined =>
  tags?.map((tag) => ({
    optionKey: tag.id,
    label: tag.title,
    extraText: `+${tag.occurrence}`,
  }))
