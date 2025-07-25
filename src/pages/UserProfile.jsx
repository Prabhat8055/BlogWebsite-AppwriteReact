import authService from "../appwrite/auth";
import { useEffect, useState } from "react";
import { Loader2, UserCircle2, Mail, Calendar } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        <span className="ml-2 text-gray-600">Loading user data...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        No user is logged in.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          <img
            src={`data:image/jpeg;base64,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`}
            className="w-25 rounded-[100px]"
          />
        </div>

        {/* User Info */}
        <h2 className="text-xl font-bold text-gray-800">
          {user.name || "Unnamed User"}
        </h2>

        <div className="text-gray-600 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>

        <div className="text-gray-600 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            Joined on {new Date(user.registration * 1000).toLocaleDateString()}
          </span>
        </div>

        {/* Preferences / Settings Placeholder */}
        <div className="mt-6 w-full">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
