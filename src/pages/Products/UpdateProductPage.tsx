import { useEffect, useState } from "react";
import type { ProductRequest, ProductResponse } from "../../types/product";
import { getProductById, updateProduct } from "../../services/product.service";
import { useParams } from "react-router-dom";

const UpdateProductPage = () => {

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setErrors] = useState("");
    const [product, setProduct] = useState<ProductResponse | null>(null);

    const [name, setName] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | null>();
    const [stock, setStock] = useState<number | null>();

    const {id} = useParams<{id: string}>();

    const payload: ProductRequest = {
        name: name,
        unitPrice: unitPrice || 0,
        stock: stock || 0
    }
   

    const getProduct = async() => {
        if (!id) return;
        setFetching(true);
        setErrors('');
        try {
            const response = await getProductById(Number(id));
            // getProductById already returns response.data, so response is the product data
            setProduct(response);
            // Populate form fields with fetched product data
            if (response) {
                setName(response.name || '');
                setUnitPrice(response.unitPrice ? Number(response.unitPrice) : null);
                setStock(response.stock || null);
            }
        } catch (err: any) {
            console.log("Failed to fetch the product", err);
            setErrors(err?.message || "Failed to fetch product");
        } finally {
            setFetching(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, [id])

    const handleEditProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors('');
        try {
            const response = await updateProduct(Number(id), payload);
            // to update the data
            return response?.data;
        } catch (err: any) {
            console.log("Failed to update the product");
            setErrors(err?.message || "Failed to update product");
        } finally {
            setLoading(false);
        }
    }




    if (fetching) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error && !product) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-slate-100">
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                        Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-slate-100">
                
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">Update Product</h2>
                    <p className="text-slate-500 text-sm">Update the details of your product below.</p>
                </div>

                <form onSubmit={handleEditProduct} className="space-y-6">
                    
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Input Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                            Product Name
                        </label>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Input Unit Price */}
                    <div>
                        <label htmlFor="unitPrice" className="block text-sm font-semibold text-slate-700 mb-2">
                            Unit Price
                        </label>
                        <input 
                            type="number"
                            id="unitPrice"
                            step={0.01}
                            min={0}
                            placeholder="e.g. 29.99"
                            value={unitPrice ?? ''}
                            onChange={(e)=>setUnitPrice(e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Input Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-semibold text-slate-700 mb-2">
                            Stock
                        </label>
                        <input 
                            type="number"
                            id="stock"
                            step={1}
                            min={0}
                            placeholder="e.g. 100"
                            value={stock ?? ''}
                            onChange={(e)=>setStock(e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
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
                            "Update Product"
                        )}
                    </button>

                </form>
            </div>
        </div>
    )
};
export default UpdateProductPage;