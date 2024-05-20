import { tagsQueryKeys } from "@api/tags/tagsQueryKeys"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export type Tag = {
  title: string
  occurrence: number
  id: number
}

const tagsMock: Tag[] = [
  { id: 1, title: "JavaScript", occurrence: 15 },
  { id: 2, title: "React", occurrence: 10 },
  { id: 3, title: "TypeScript", occurrence: 8 },
  { id: 4, title: "HTML", occurrence: 20 },
  { id: 5, title: "CSS", occurrence: 18 },
  { id: 6, title: "Node.js", occurrence: 12 },
  { id: 7, title: "Express.js", occurrence: 7 },
  { id: 8, title: "MongoDB", occurrence: 5 },
  { id: 9, title: "Redux", occurrence: 9 },
  { id: 10, title: "Webpack", occurrence: 6 },
  { id: 11, title: "Babel", occurrence: 4 },
  { id: 12, title: "Vue.js", occurrence: 3 },
  { id: 13, title: "Angular", occurrence: 2 },
  { id: 14, title: "Sass", occurrence: 4 },
  { id: 15, title: "Bootstrap", occurrence: 8 },
  { id: 16, title: "Jest", occurrence: 7 },
  { id: 17, title: "Cypress", occurrence: 3 },
  { id: 18, title: "Docker", occurrence: 5 },
  { id: 19, title: "GraphQL", occurrence: 6 },
  { id: 20, title: "REST", occurrence: 10 },
]
const mockTagsApiCall = (filter?: string) =>
  new Promise<Tag[]>((response) => {
    setTimeout(() => {
      response(tagsMock.filter((tag) => tag.title.toLowerCase().includes(filter?.toLowerCase() ?? "")))
    }, 500)
  })

const mockInitTagsApiCall = () =>
  new Promise<Tag[]>((response) => {
    setTimeout(() => {
      response(tagsMock.slice(0, 5))
    }, 2000)
  })

export const useTagsListOptionsQuery = (filters: { name?: string } = {}) => {
  return useQuery({
    queryFn: () => mockTagsApiCall(filters?.name),
    queryKey: tagsQueryKeys.listOptions(JSON.stringify(filters)),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  })
}
export const useTagsListSelectedListQuery = () => {
  return useQuery({
    queryFn: mockInitTagsApiCall,
    queryKey: tagsQueryKeys.listSelected(),
  })
}
