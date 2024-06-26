import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
