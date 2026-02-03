
import type { OrderResponse } from "../../../types/order";

interface OrderListProps {
  orders: OrderResponse[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) return <p className="text-slate-500">No orders found.</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Client</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Total</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">#{order.id}</td>
              <td className="px-6 py-4 text-slate-600">{order.clientName}</td>
              <td className="px-6 py-4 text-slate-500 text-sm">
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 font-bold text-slate-900">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                  ${order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;