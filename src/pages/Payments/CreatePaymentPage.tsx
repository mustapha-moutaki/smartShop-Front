import { useState, useEffect } from "react";
import type { PaymentRequest } from "../../types/payment";
import type { OrderResponse } from "../../types/order";
import { createPayment } from "../../services/payment.service";
import { getOrders } from "../../services/order.service";
import { useNavigate } from "react-router-dom";

const CreatePaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [fetchingOrders, setFetchingOrders] = useState(false);
    const [error, setError] = useState("");
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState<number | null>(null);
    const [amount, setAmount] = useState<number | null>();
    const [paymentType, setPaymentType] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [encashmentDate, setEncashmentDate] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setFetchingOrders(true);
            try {
                const response = await getOrders();
                // Handle both array and PageResponse structure
                const ordersList = Array.isArray(response) ? response : response.content || [];
                setOrders(ordersList);
            } catch (err: any) {
                console.log("Failed to fetch orders", err);
                setError(err?.message || "Failed to fetch orders");
            } finally {
                setFetchingOrders(false);
            }
        };
        fetchOrders();
    }, []);

    const payload: PaymentRequest = {
        orderId: orderId!,
        amount: amount || 0,
        paymentType: paymentType,
        paymentDate: paymentDate || undefined,
        encashmentDate: encashmentDate || undefined
    }

    const handleCreatePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) {
            setError("Please select an order");
            return;
        }
        setLoading(true);
        setError('');
        try {
            await createPayment(payload);
            navigate("/payments");
        } catch (err: any) {
            console.log("Failed to create payment");
            setError(err?.message || "Failed to create payment");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-slate-100">
                
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">Create Payment</h2>
                    <p className="text-slate-500 text-sm">Add a new payment transaction below.</p>
                </div>

                <form onSubmit={handleCreatePayment} className="space-y-6">
                    
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Input Order ID */}
                    <div>
                        <label htmlFor="orderId" className="block text-sm font-semibold text-slate-700 mb-2">
                            Order <span className="text-red-500">*</span>
                        </label>
                        {fetchingOrders ? (
                            <div className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500">
                                Loading orders...
                            </div>
                        ) : (
                            <select
                                id="orderId"
                                value={orderId ?? ''}
                                onChange={(e) => setOrderId(e.target.value ? Number(e.target.value) : null)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                required
                            >
                                <option value="" disabled className="text-slate-400">Select an order</option>
                                {orders.map((order) => (
                                    <option key={order.id} value={order.id} className="text-slate-900">
                                        Order #{order.id} - {order.clientName} - ${order.total?.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Input Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="number"
                            id="amount"
                            step={0.01}
                            min={0}
                            placeholder="e.g. 1506.26"
                            value={amount ?? ''}
                            onChange={(e)=>setAmount(e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Input Payment Type */}
                    <div>
                        <label htmlFor="paymentType" className="block text-sm font-semibold text-slate-700 mb-2">
                            Payment Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="paymentType"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                            required
                        >
                            <option value="" disabled className="text-slate-400">Select payment type</option>
                            <option value="CASH" className="text-slate-900">Cash</option>
                            <option value="CREDIT_CARD" className="text-slate-900">Credit Card</option>
                            <option value="DEBIT_CARD" className="text-slate-900">Debit Card</option>
                            <option value="BANK_TRANSFER" className="text-slate-900">Bank Transfer</option>
                            <option value="MOBILE_PAYMENT" className="text-slate-900">Mobile Payment</option>
                            <option value="OTHER" className="text-slate-900">Other</option>
                        </select>
                    </div>

                    {/* Input Payment Date */}
                    <div>
                        <label htmlFor="paymentDate" className="block text-sm font-semibold text-slate-700 mb-2">
                            Payment Date (Optional)
                        </label>
                        <input 
                            type="date"
                            id="paymentDate"
                            value={paymentDate}
                            onChange={(e)=>setPaymentDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Input Encashment Date */}
                    <div>
                        <label htmlFor="encashmentDate" className="block text-sm font-semibold text-slate-700 mb-2">
                            Encashment Date (Optional)
                        </label>
                        <input 
                            type="date"
                            id="encashmentDate"
                            value={encashmentDate}
                            onChange={(e)=>setEncashmentDate(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all shadow-lg ${
                            loading 
                                ? "bg-slate-400 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]"
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2 text-white">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating...
                            </div>
                        ) : (
                            "Create Payment"
                        )}
                    </button>

                </form>
            </div>
        </div>
    )
};

export default CreatePaymentPage;

