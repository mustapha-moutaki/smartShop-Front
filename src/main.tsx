import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import OrdersPage from "./pages/Orders/OrdersPage.tsx";
import  SignInPage  from "./pages/Auth/SignInPage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route  path="/orders" element={<OrdersPage/>} />
        <Route path= "/login" element={<SignInPage/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
