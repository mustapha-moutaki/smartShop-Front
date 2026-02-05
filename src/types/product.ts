export interface ProductResponse{
 id: number;
 name?: string;
 unitPrice?: string;
 stock?: number;
}


export interface PageResponse<T>{
 content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}