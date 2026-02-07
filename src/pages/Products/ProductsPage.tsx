import { useEffect, useState } from "react"
import ProductList from "./commun/ProductList"
import { deleteProduct, getAllProducts, updateProduct } from "../../services/product.service";
import { useNavigate } from "react-router-dom";
import type { PageResponse, ProductRequest, ProductResponse } from "../../types/product";


const ProductsPage = () => {

    const [products, setProducts] = useState<ProductResponse[]>([]); 

    const [totalPages, setTotalPages] = useState<number>(0);

    const [page, setPage] = useState<number>(0);

    const [loading, setLoading] = useState(false);

    const [errors, setErros] = useState<string | null>(null); 

    const navigate = useNavigate();

  

    const fetchProducts = async () => {
        setLoading(true);
        setErros(null); 

        try {
            const response: PageResponse<ProductResponse> = await getAllProducts();

            setProducts(response.content);
            console.log("this sithe product page mr: ", products)

            
            setTotalPages(response.totalPages);

            
            setPage(response.number);

            console.log("the products fetched successfully: ", response);

        } catch (err: any) {
            console.log("Failed fetched products", err);

          
            setErros(err?.message || "Something went wrong"); 

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])



    const handleDeleteProduct = async(id: number)=>{
        if(!confirm("are you sure you want to delete this product? "))return;

        setLoading(true);
        setErros('');
        try{
            await deleteProduct(id);
            fetchProducts();
        }catch(err: any){
            console.log("Failed to delete produc with id"+ id, err);
            setErros(err);
        }finally{
            setLoading(false)
        }
    }

    

    return (
        <>
            <div className="space-y-6 p-4 md:p-0">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
                        <p className="text-slate-500 text-sm">Monitor and update your product catalog</p>
                    </div>

                    <button
                        onClick={() => navigate("/products/new")}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <span className="text-xl">+</span>
                        Create New Product
                    </button>
                </div>

                {/* Error Message */}
                {errors && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                        Error loading products. Please try again.
                    </div>
                )}

                {/* Main Content Area */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 font-medium">Fetching products...</p>
                        </div>
                    ) : (
                        <div>
                          
                            <ProductList products={products} deleteProduct={handleDeleteProduct} />
                        </div>
                    )}
                </div>

            </div>
        </>
    )
};

export default ProductsPage;
