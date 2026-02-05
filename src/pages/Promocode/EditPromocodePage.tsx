import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PromoCodeRequest, PromocodeResponse } from "../../types/promocode";
import {getPromocodeById, updatePromocode} from "../../services//promocode.service"

const EditPromocodePage = ()=>{

    const {id} = useParams<{id: string}>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [promocode, setPromocode] = useState<PromocodeResponse | null>(null);
    const [code, setCode] = useState('');
    const [percentage, setPercentage] = useState("");
    const [status, setStatus] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const fetchPromocode = async()=>{
        try{
            if(id){
                const response = await getPromocodeById(Number(id));
                setPromocode(response);
                
                setCode(response.code || "");
                setPercentage(response.percentage?.toString() || "");
                setStatus(response.active ?? null);

                console.log("this si the response by id:", response);
            }
        }catch(err: any){
            setError(err?.message); 
            console.log("Failed to get promocode", err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchPromocode();
    }, [id])



    const handleUpdatePromocode = async () => {
        const payload: PromoCodeRequest = {
            code: code,
            percentage: Number(percentage),
            status: status ?? false 
        };

        try {
            setLoading(true); 
            const response = await updatePromocode(Number(id), payload);
            console.log("the promocode updated successfully: ", response);
            navigate("/promocodes")
        } catch (err: any) {
            setError(err.message || "Error updating");
            console.log("Failed to udpate the promocode :", err)
        } finally {
            setLoading(false); // Modified: should be false after finishing
        }
    }

   return (
  <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-slate-100">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Edit Promocode</h2>
        <p className="text-slate-500 text-sm">Update the details of your discount code below.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleUpdatePromocode(); }} className="space-y-6">
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Input Code */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Promocode Code
          </label>
          <input
            type="text"
            placeholder="e.g. SUMMER24"
            // Modified: Added text-slate-900 to ensure text is visible
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        {/* Input Percentage */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            placeholder="e.g. 20"
            // Modified: Added text-slate-900 to ensure text is visible
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            required
          />
        </div>

        {/* Select Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Status
          </label>
          <select
            // Modified: Added text-slate-900 and custom style for clarity
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            value={status === null ? "" : String(status)}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="" disabled className="text-slate-400">Select status</option>
            <option value="true" className="text-slate-900">Active</option>
            <option value="false" className="text-slate-900">Inactive</option>
          </select>
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
              Updating...
            </div>
          ) : (
            "Update Promocode"
          )}
        </button>

      </form>
    </div>
  </div>
);
};

export default EditPromocodePage;
