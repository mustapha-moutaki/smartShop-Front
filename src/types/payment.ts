export interface PaymentResponse {
  id: number;
  orderId?: number;
  amount?: number;
  paymentType?: string;
  paymentDate?: string;
  encashmentDate?: string;
}

export interface PaymentRequest {
  orderId: number;
  amount: number;
  paymentType: string;
  paymentDate?: string;
  encashmentDate?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

