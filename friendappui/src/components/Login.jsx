import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  // [Keep all your existing state and logic exactly the same]
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      {/* Premium Glass Card */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl">
        {/* App Logo/Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            EliteConnect
          </h1>
          <p className="text-white/70 mt-2">
            {isLoginForm
              ? "Access your network of innovators"
              : "Join the entrepreneur elite"}
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Wick"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-amber-100 mb-1">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="john@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-100 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-amber-300 text-sm p-3 bg-white/5 rounded-lg">
              {error}
            </div>
          )}

          <button
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Access Network" : "Join Now"}
          </button>
        </div>

        {/* Toggle between Login/Signup */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLoginForm((value) => !value)}
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition"
          >
            {isLoginForm
              ? "Need an account? Apply for access →"
              : "Already a member? Sign in →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
