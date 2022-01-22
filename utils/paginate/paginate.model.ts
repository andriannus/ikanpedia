export interface PaginateMeta {
  page: number;
  perPage: number;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  totalPage: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta: PaginateMeta;
}
