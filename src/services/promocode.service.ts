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

export const deletePromocode = async(id: number)=>{
    const response = await apiClient.delete(`${PROMOCODE_BASE}/${id}`);
    return response?.data;
}

export const getPromocodeById = async(id: number)=>{
    const response = await apiClient.get(`${PROMOCODE_BASE}/${id}`);
    return response?.data
}

export const updatePromocode = async (id: number, payload: PromoCodeRequest)=>{
    const response = await apiClient.put(`${PROMOCODE_BASE}/${id}`, payload);
    return  response?.data
}