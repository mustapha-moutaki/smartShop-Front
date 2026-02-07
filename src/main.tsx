import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import OrdersPage from "./pages/Orders/OrdersPage.tsx";
import  SignInPage  from "./pages/Auth/SignInPage.tsx"
import MainLayout from "./layouts/MainLayout.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import OrderShowPage from "./pages/Orders/OrderShowPage.tsx";
import PromocodePage from "./pages/Promocode/PromocodePage.tsx";
import EditPromocodePage from "./pages/Promocode/EditPromocodePage.tsx";
import CreatePromocodePage from "./pages/Promocode/commun/CreatePromocodePage.tsx";
import ProductsPage from "./pages/Products/ProductsPage.tsx";
import UpdateProductPage from "./pages/Products/UpdateProductPage.tsx";
// import CreateOrderPage from ".//pages/Orders/CreatOrderPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

         {/* Public layout */}
        <Route element={<MainLayout />}>

              <Route path="/login" element={<SignInPage />} />

        </Route>



           {/* Dashboard Layout  */}
          <Route element={< DashboardLayout/>}>

              <Route  path="/orders" element={<OrdersPage/>} />
              <Route path="/admin-dashboard" element={< DashboardPage/>} />
              <Route path="/orders/:id" element={< OrderShowPage/>} />
              {/* <Route path="/orders/new" element={< CreateOrderPage/>} /> */}

              <Route path="/products" element={<ProductsPage/> } />
              <Route path="/products/:id" element={<UpdateProductPage/>} />

              <Route path="/promocodes" element={< PromocodePage/>} />
              <Route path="/promocodes/:id" element={< EditPromocodePage/>} />
              <Route path="/promocodes/new" element={<CreatePromocodePage/>} />
          </Route>
        

        <Route path="*" element={<NotFoundPage />} />



      
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
