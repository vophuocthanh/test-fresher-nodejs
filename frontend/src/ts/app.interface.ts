/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  items_per_page: number;
}

export interface ListParams {
  page?: number;
  item_per_page?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}
