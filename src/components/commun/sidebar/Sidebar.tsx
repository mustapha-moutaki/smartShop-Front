// components/commun/sidebar/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Helper function to style active links
  const linkClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
    ${location.pathname === path 
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
  `;

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
      {/* Branding Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-indigo-600 font-black text-2xl tracking-tight">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <span className="text-white text-xs">SS</span>
          </div>
          SmartShop
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link to="/admin-dashboard" className={linkClass("/dashboard")}>
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link to="/orders" className={linkClass("/orders")}>
          <span className="font-medium">Manage Orders</span>
        </Link>

        <Link to="/promocodes" className={linkClass("/promocodes")}>
        <span className="front-medium">Manage promocodes</span>
        </Link>

        <Link to="/products" className={linkClass("/products")}>
          <span className="font-medium">Products</span>
        </Link>

        <Link to="/payments" className={linkClass("/payments")}>
          <span className="font-medium">Manage Payments</span>
        </Link>
      </nav>

      {/* Logout or Help Section */}
      <div className="p-4 border-t border-slate-100">
         <button className="w-full text-left px-4 py-3 text-sm text-slate-500 hover:text-black-900 transition-colors  bg-red-600">
            Log out
         </button>
      </div>
    </aside>
  );
}