import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { loginSchema } from "../../../../shared/auth.schema";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await login(data);

      if (response) {
        toast.success("Login successful! Welcome back");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.errors) {
        setError(error.errors.field, {
          type: "server",
          message: error.errors.message,
        });
      }
      toast.error(error.message || "Invalid credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      {/* Background decorative glow elements - perfectly matching register view */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Sign in to continue to your real-time chat dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Mail size={18} />
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
                } rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-4 transition duration-200
                 autofill:shadow-[0_0_0_30px_rgb(2_6_23/_0.5)_inset] 
                 autofill:text-fill-white`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Lock size={18} />
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full pl-10 pr-11 py-2.5 bg-slate-950/50 border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-slate-800 focus:ring-indigo-500/20 focus:border-indigo-500"
                } rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-4 transition duration-200
                 autofill:shadow-[0_0_0_30px_rgb(2_6_23/_0.5)_inset] 
                 autofill:text-fill-white`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-150"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
