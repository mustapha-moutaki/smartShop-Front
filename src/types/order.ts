// Order Create shape
export interface OrderItem {
  productId: number;
  quantity: number;
}
export interface CreateOrderPayload{
    
    clientId: string
    promoCodeId?: string // ,ybe *2 not
    items: OrderItem[]

}



// Order Response Shape
export interface OrderResponse{

}