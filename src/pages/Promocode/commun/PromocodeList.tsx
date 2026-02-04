import { DeleteButtonOutline, EditButtonOutline } from "../../../components/commun/Button";
import type { PromocodeResponse } from "../../../types/promocode";
import { deletePromocode } from "../../../services/promocode.service";
import { useNavigate } from "react-router-dom";

interface PromocodeListProps{
    promocodes: PromocodeResponse[];
    onFresh: ()=>void;
}

const PromocodeList:React.FC<PromocodeListProps> = ({ promocodes, onFresh}) => {

  if (!promocodes || promocodes.length === 0) {
    return (
      <tr>
        <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">
          No promocodes found in the system.
        </td>
      </tr>
    );
  }

  const navigate = useNavigate();

  // delete promocode

  const handle1DeletePromocode = async(id: number)=>{
    if(confirm("are you sure, you want to delete this item ?")){
         try{
        await deletePromocode(id);
        console.log("the promocode deleted")
        onFresh();
    }catch(err){
        console.log("Failed to delete the promocode with id: "+ id, err)
    }
    
}
  }

  return (
    <>
      {promocodes.map((promocode) => (
        <tr key={promocode.id} className="hover:bg-slate-50 transition-colors">
          <td className="px-6 py-4 font-bold text-indigo-600">
            {promocode.code}
          </td>
          <td className="px-6 py-4 text-slate-600">
            {promocode.percentage}% OFF
          </td>
          <td className="px-6 py-4">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
              Active
            </span>
          </td>
{/*  actions buttons */}
           <td className="px-6 py-4 gap-3.5">
            <span>
                 <EditButtonOutline
                onClick={()=> navigate(`/promocodes/${promocode.id}`)}
                 />
            </span>
               <span>
                  <DeleteButtonOutline
                  onClick={()=>handle1DeletePromocode(promocode.id)}
                   />
               </span>
               
          </td>
        </tr>
      ))}
    </>
  );
};
export default PromocodeList;