export interface PromocodeResponse{
    id: number;
    code?: string;
    percentage?: number
    active?: boolean
}

export interface PromoCodeRequest{
    code: string;
    percentage?: number
}