import { useEffect, useState } from "react"
import PaymentList from "./commun/PaymentList"
import { deletePayment, getAllPayments } from "../../services/payment.service";
import { useNavigate } from "react-router-dom";
import type { PageResponse, PaymentResponse } from "../../types/payment";

const PaymentsPage = () => {
    const [payments, setPayments] = useState<PaymentResponse[]>([]); 
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null); 
    const navigate = useNavigate();

    const fetchPayments = async () => {
        setLoading(true);
        setErrors(null); 

        try {
            const response: PageResponse<PaymentResponse> = await getAllPayments();

            setPayments(response.content);

            console.log("the payments fetched successfully: ", response);

        } catch (err: any) {
            console.log("Failed fetched payments", err);
            setErrors(err?.message || "Something went wrong"); 

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPayments();
    }, [])

    const handleDeletePayment = async(id: number) => {
        if(!confirm("Are you sure you want to delete this payment? ")) return;

        setLoading(true);
        setErrors('');
        try {
            await deletePayment(id);
            fetchPayments();
        } catch (err: any) {
            console.log("Failed to delete payment with id" + id, err);
            setErrors(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="space-y-6 p-4 md:p-0">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Payment Management</h1>
                        <p className="text-slate-500 text-sm">Monitor and manage all payment transactions</p>
                    </div>

                    <button
                        onClick={() => navigate("/payments/new")}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <span className="text-xl">+</span>
                        Create New Payment
                    </button>
                </div>

                {errors && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                        Error loading payments. Please try again.
                    </div>
                )}

                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 font-medium">Fetching payments...</p>
                        </div>
                    ) : (
                        <div>
                            <PaymentList payments={payments} deletePayment={handleDeletePayment} />
                        </div>
                    )}
                </div>

            </div>
        </>
    )
};

export default PaymentsPage;

