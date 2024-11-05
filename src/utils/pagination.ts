export interface PaginationRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}   

export interface PaginationResponse<T> {
  data        : T[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

export const initPageData = (paramPageSize: number = 5) => {
  return (
    {page: 0, pageSize: paramPageSize }
  );
}

export const initSortData = (paramField: string, paramSort: string = 'asc') => {
  return (
    {field: paramField, sort: paramSort}
  )
}