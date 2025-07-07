import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  //1st way to display
  // if (loading) {
  //   return <div className="font-black">Loading...</div>;
  // }
  // return (
  //   <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
  //     <div className="w-full block text-center">
  //       <Header />
  //       <main className="p-10">
  //         <Outlet />
  //       </main>
  //       <Footer />
  //     </div>
  //   </div>
  // );

  //2nd way to display
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#393E46]">
      <div className="w-full block">
        <Header />
        <main className="p-10">
          <Outlet />
        </main>
      </div>
        <div className="w-full block">
          <Footer />
        </div>
    </div>
  ) : null;
}

export default App;
