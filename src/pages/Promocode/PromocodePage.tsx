import { useEffect, useState } from "react";
import PromocodeList from "./commun/PromocodeList";
import { getAll, createPromocde} from "../../services/promocode.service";
import { useNavigate } from "react-router-dom";


const PromocodePage = ()=>{

    const [promocodes, setPromocodes] =  useState<any []>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState('');

    const navigate = useNavigate()
    
        const fetchPromoCodes = async()=>{
            try{
                const response = await getAll();
                const promocodesList =  response;
                setPromocodes(promocodesList);
                console.log("gotm component ", promocodesList)
            }catch(err: any){
                console.log("Failed to fetch promocodes", err);
                setPromocodes([]);
                setError(err);
            }finally{
                setLoading(false)
            }

        };
   

    useEffect(()=>{
        fetchPromoCodes();
    }, [])



   return (
    <div className="p-6 space-y-4">

          <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Promocodes</h1>
        <button
          onClick={() => navigate("/promocodes/new")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <span className="text-xl">+</span>
          Create New Promocode
        </button>
        </div>


     

      {loading ? (
        // 1. Show Spinner while loading
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        // 2. Show Error if it exists
        <div className="p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-100">
          {error}
        </div>
      ) : (
        // 3. Show the List (The list will handle its own "Empty" state)
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <PromocodeList promocodes={promocodes}  onFresh={fetchPromoCodes}/>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default PromocodePage;