
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConfirmOrder, getOrderById, updateOrder } from "../../services/order.service";
import { ConfirmButton, EditButton } from "../../components/commun/Button";
import { ArrowLeft, Calendar, User, Package, CreditCard, AlertCircle } from "lucide-react"; // Added AlertCircle

const OrderShowPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      if (id) {
        const data = await getOrderById(Number(id));
        setOrder(data);
        setStatus(data.status); 
      }
    } catch (error: any) {
      const messageError = error.response?.data?.message || "Unexpected error";
      setError(messageError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    try {
      await updateOrder(Number(id), { status: status });
      alert("Status updated successfully!");
      fetchOrder(); 
    } catch (error: any) {
      setError(error.response?.data?.message || "Update failed.");
    }
  };

  const handleConfirmOrder = async (id: number) => {
    setError(""); 
    try {
      await ConfirmOrder(id);
      alert("The order confirmed");
    } catch (e: any) {
      const serverMessage = e.response?.data?.message || "Failed to confirm order";
      console.log("server message ", serverMessage);
      setError(serverMessage);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* Header Navigation ... (same as before) */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back to Orders
        </button>
        <div className="flex gap-2">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
            ${order?.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {order?.status}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN ... (same as before) */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Package size={20} className="text-indigo-500" /> Order Details #{id}
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                        <User size={12}/> Client
                        </p>
                        <p className="font-semibold text-slate-900">{order?.clientName}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                        <Calendar size={12}/> Date
                        </p>
                        <p className="font-semibold text-slate-900">{new Date(order?.date).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Items Table ... (same as before) */}
                <tbody className="divide-y divide-slate-50">
                    {order?.items.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td className="px-4 py-4 font-medium text-slate-800">{item.productName}</td>
                        <td className="px-4 py-4 text-center text-slate-600">{item.quantity}</td>
                        <td className="px-4 py-4 text-right font-bold text-slate-900">${item.totalLine.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
            </div>
        </div>

        {/* RIGHT COLUMN: Status Update & Financials */}
        <div className="space-y-6">
          
          {/* Status Control Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 text-black">
            <h3 className="font-bold text-slate-900 mb-4">Control Panel</h3>

            {/* ERROR DISPLAY BOX */}
            {error && (
              <div className="mb-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-rose-600 shrink-0" size={18} />
                <p className="text-sm text-rose-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Change Status</label>
                <select 
                  value={status}
                  onChange={(e) => {
                      setStatus(e.target.value);
                      setError(""); // Clear error when user changes selection
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <EditButton className="w-full" />
                
                {/* Only show Confirm if pending */}
                {order?.status === "PENDING" && (
                  <ConfirmButton 
                    className="w-full" 
                    onClick={() => handleConfirmOrder(order.id)} 
                  />
                )}
              </div>
            </form>
          </div>

          {/* Financial Summary Card */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
             <h3 className="font-bold mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-indigo-400" /> Payment Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between opacity-70">
                <span>Subtotal</span>
                <span>${order?.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Discount</span>
                <span>-${order?.discount.toFixed(2)}</span>
              </div>
              {/* Show Remaining Amount if it exists and is > 0 */}
              {order?.remainingAmount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Remaining to Pay</span>
                  <span>${order?.remainingAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between opacity-70">
                <span>VAT</span>
                <span>${order?.vat.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                <span className="font-bold">Total Amount</span>
                <span className="text-2xl font-black text-indigo-400">${order?.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderShowPage;