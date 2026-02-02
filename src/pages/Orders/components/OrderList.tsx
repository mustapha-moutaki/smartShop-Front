import React from "react"

interface OrderListProps{
    orders: any[];
}

const OrderList:React.FC<OrderListProps> = ({orders}) =>{
   return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          Order #{order.id} - Client: {order.clientId}
        </li>
      ))}
    </ul>
  );
}
export default OrderList;