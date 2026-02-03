import { DeleteButtonOutline, EditButtonOutline } from "../../../components/commun/Button";
import type { PromocodeResponse } from "../../../types/promocode";


interface PromocodeListProps{
    promocodes: PromocodeResponse[];
}

const PromocodeList:React.FC<PromocodeListProps> = ({ promocodes }) => {

  if (!promocodes || promocodes.length === 0) {
    return (
      <tr>
        <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">
          No promocodes found in the system.
        </td>
      </tr>
    );
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
                
                 />
            </span>
               <span>
                  <DeleteButtonOutline />
               </span>
               
          </td>
        </tr>
      ))}
    </>
  );
};
export default PromocodeList;