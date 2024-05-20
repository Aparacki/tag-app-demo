export const tagsQueryKeys = {
  all: ["tags"] as const,
  listOptions: (filters: string) => [...tagsQueryKeys.all, "listOptions", filters] as const,
  listSelected: () => [...tagsQueryKeys.all, "listSelected"] as const,
}
