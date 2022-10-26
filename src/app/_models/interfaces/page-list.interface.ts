export interface IPageList<T> {
  currentPage: number;
  itemsPerPage: number;
  list: T[];
  totalPages: number;
  totals: number;
}
