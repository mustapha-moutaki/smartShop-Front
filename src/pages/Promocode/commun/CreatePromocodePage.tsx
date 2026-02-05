import { Target } from "lucide-react";
import { useState } from "react";
import type { PromoCodeRequest } from "../../../types/promocode";
import { createPromocde } from "../../../services/promocode.service";
import { useNavigate } from "react-router-dom";
const createPromocdePage = ()=>{
    const [code, setCode] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate()




    const payload: PromoCodeRequest = {
        code: code,
        percentage: percentage
    }
    const handleCreatePromocode = async()=>{
        if(payload){
            try{
                setLoading(true);
              await createPromocde(payload);
              navigate("/promocodes");
              
            }catch(err:any){
                console.log("Failed to create a promocode ", err)
            }finally{
                setLoading(false)
            }
        }
    }


    return(
     <div className="max-w-md mx-auto p-8 text-black">
    <h1 className="text-2xl font-black mb-8 tracking-tighter uppercase">New Promocode</h1>
    
    <form 
        onSubmit={(e) => { e.preventDefault(); handleCreatePromocode(); }}
        className="flex flex-col space-y-6"
    >
        <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Code Name</label>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="E.G. BLACKFRIDAY"
                className="border-2 border-black p-3 text-sm outline-none focus:bg-gray-50 transition-colors"
            />
        </div>

        <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Discount %</label>
            <input
                type="number"
                step={1}
                value={percentage}
                onChange={(e) => setPercentage(parseInt(e.target.value))}
                className="border-2 border-black p-3 text-sm outline-none focus:bg-gray-50 transition-colors"
            />
        </div>

        {loading ? (
            <div className="py-4 text-center text-xs font-bold animate-pulse tracking-widest">
                PROCESSING...
            </div>
        ) : (
            <button
                type="submit"
                className="bg-black text-white p-4 font-bold uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-all active:scale-[0.98]"
            >
                Create Entry
            </button>
        )}
    </form>
</div>
    )
};
export default createPromocdePage;