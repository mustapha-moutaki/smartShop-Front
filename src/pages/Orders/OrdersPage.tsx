import { useEffect, useState } from "react";
import { getOrders } from "../../services/order.service";
import OrderList from "./components/OrderList";
import { useNavigate } from "react-router-dom";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Move fetchOrders here so it can be reused
  const fetchOrders = async () => {
    // We don't necessarily want the full-screen loading spinner 
    // to pop up every time we delete an item, but for now it's fine
    try {
      const response = await getOrders();
      setOrders(response);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setOrders([]); 
    } finally {
      setLoading(false);
    }
  };

  // 2. useEffect just calls the function once on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
          <p className="text-slate-500 text-sm">View and manage all customer transactions</p>
        </div>

        <button
          onClick={() => navigate("/orders/create")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <span className="text-xl">+</span>
          Create New Order
        </button>
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium">Fetching orders...</p>
          </div>
        ) : (
          /* 3. Pass fetchOrders as a prop called onRefresh */
          <OrderList orders={orders} onRefresh={fetchOrders} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;