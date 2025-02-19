import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Footer } from "@/widgets/footer";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};
