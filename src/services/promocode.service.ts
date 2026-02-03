import apiClient from "../../lib/ApiClient"
import type { PromoCodeRequest } from "../types/promocode";

const PROMOCODE_BASE ='/promocodes';

export const getAll = async ()=>{
    const response  = await apiClient.get(PROMOCODE_BASE);
    console.log("promocodes ", response)
    return response.data
}

export const createPromocde = async (payload: PromoCodeRequest)=>{
    const response  = await apiClient.post(PROMOCODE_BASE, payload);
    return response.data
}