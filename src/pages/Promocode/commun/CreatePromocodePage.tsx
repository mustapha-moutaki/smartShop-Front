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
      <div style={{ padding: '20px', fontFamily: 'sans-serif' , color: "black", border: "1px solid balck" }}>
    <form 
        onSubmit={(e) => { e.preventDefault(); handleCreatePromocode(); }}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}
    >
        <label>Code</label>
        <input 
            type="text" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            style={{ padding: '8px', border: "2px solid black"}}
        />

        <label>Percentage</label>
        <input 
            type="number" 
            step={1} 
            value={percentage} 
            onChange={(e) => setPercentage(parseInt(e.target.value))} 
            style={{ padding: '8px' , border: "1px solid black"}}
        />
        
        {loading ? (
            <p>loading...</p>
        ) : (
            <button type="submit" style={{ padding: '10px', cursor: 'pointer', color: "white" }}>
                Create
            </button>
        )}
    </form>
</div>
    )
};
export default createPromocdePage;