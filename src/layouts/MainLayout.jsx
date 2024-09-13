import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthContextProvider from "../contexts/AuthContext";

const MainLayout = () => {
  return (
    <>
      {/* Alle Komponenten, die zugang zum Context brauchen, werden in ihn hineingepackt */}
      <AuthContextProvider>
        <h1 className="flex text-[#d5c3aa] justify-center text-4xl font-bold p-2">
          Event Scheduler
        </h1>
        <Navbar />
        <Outlet />
        <br />
        <footer>&copy; 2024</footer>
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
