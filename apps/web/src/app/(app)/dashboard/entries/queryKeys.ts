export const entriesKeys = {
  all: ["entries"] as const,
  list: (searchTerm?: string) =>
    [...entriesKeys.all, { search: searchTerm ?? "" }] as const,
  detail: (id: string | null) => [...entriesKeys.all, "detail", id] as const,
};
