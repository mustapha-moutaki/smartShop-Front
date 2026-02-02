import { useEffect, useState } from "react";
import { getOrders } from "../../services/order.service";
import OrderList from "./components/OrderList";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
};

export default OrdersPage;
