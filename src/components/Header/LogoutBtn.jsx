import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LogoutBtn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      disabled={loading}
      className={`flex items-center gap-2  hover:text-red-600 text-red-700 font-medium rounded-xl transition duration-300 ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading && <Loader2 className="animate-spin w-4 h-4" />}
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutBtn;
