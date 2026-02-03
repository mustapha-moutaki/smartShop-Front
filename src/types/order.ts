
export interface CreateOrderPayload{
    
    clientId: string
    promoCodeId?: string // ,ybe *2 not
    items: OrderItemDetails[]

}



// Order Response Shape
export interface OrderItemDetails {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalLine: number;
}

export interface OrderResponse {
  id: number;
  clientId: number;
  clientName: string;
  date: string;
  subTotal: number;
  discount: number;
  vat: number;
  total: number;
  status: string;
  remainingAmount: number;
  promoCodeId?: number;
  items: OrderItemDetails[]; // Use the detailed item interface
}