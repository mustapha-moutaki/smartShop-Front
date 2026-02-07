import { useNavigate } from "react-router-dom";
import { DeleteButtonOutline, EditButtonOutline } from "../../../components/commun/Button";
import type { PaymentResponse } from "../../../types/payment";

interface PaymentListProps {
    payments: PaymentResponse[];
    deletePayment: (id: number) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ payments, deletePayment }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            {/* Header Section styled to match the clean Slate aesthetic */}
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Payments</h2>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Total: {payments?.length || 0}
                </span>
            </div>

            {/* Table Container - Rounded, Bordered, and Shadowed like ProductList */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Encashment Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {payments && payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">#{payment.id}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {payment.orderId ? `#${payment.orderId}` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        ${payment.amount?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{payment.paymentType || 'N/A'}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {payment.encashmentDate ? new Date(payment.encashmentDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <EditButtonOutline onClick={() => navigate(`/payments/${payment.id}`)} />
                                            <DeleteButtonOutline onClick={() => deletePayment(payment.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                                    No payments available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentList;

