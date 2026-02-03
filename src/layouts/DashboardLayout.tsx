// layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/commun/header/Header";
import Sidebar from "../components/commun/sidebar/Sidebar";
import Footer from "../components/commun/footer/Footer";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />

        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>

        <Footer />
      </div>

    </div>
  );
}
