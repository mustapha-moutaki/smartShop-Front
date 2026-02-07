import { useNavigate } from "react-router-dom";
import { DeleteButtonOutline, EditButtonOutline } from "../../../components/commun/Button";
import { updateProduct } from "../../../services/product.service";
import type { ProductRequest, ProductResponse } from "../../../types/product";

interface ProductListProps {
    products: ProductResponse[];
    deleteProduct: (id: number)=>void;
}

const ProductList: React.FC<ProductListProps> = ({ products,  deleteProduct}) => {


    const navigate = useNavigate();


    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            {/* Header Section styled to match the clean Slate aesthetic */}
            <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Products</h2>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Total: {products?.length || 0}
                </span>
            </div>

            {/* Table Container - Rounded, Bordered, and Shadowed like OrderList */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products && products.length > 0 ? (
                            products.map((pro) => (
                                <tr key={pro.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">#{pro.id}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{pro.name}</td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        ${pro.unitPrice}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                                            ${(pro.stock ?? 0) < 5 
                                                ? 'bg-red-100 text-red-700' 
                                                : 'bg-emerald-100 text-emerald-700'}`}>
                                            {pro.stock ?? 0} in stock
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <EditButtonOutline onClick={()=>navigate(`/products/${pro.id}`)} />
                                            <DeleteButtonOutline onClick={()=>deleteProduct(pro.id)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;