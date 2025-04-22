import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

function LoginPage() {
  const [visaPass, setVisaPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggarIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          {/* Logo and header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-gray-800">Welcome Back</h1>
              <p className="text-sm text-gray-500">Sign in to your account</p>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10 bg-white text-gray-900"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={visaPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10 bg-white text-gray-900"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setVisaPass(!visaPass)}
                >
                  {visaPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoggarIn}
            >
              {isLoggarIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration / color */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-50">
        <div className="text-center px-10">
          <h2 className="text-3xl font-bold text-indigo-600">Welcome to YourApp</h2>
          <p className="mt-4 text-gray-500">Manage your account, settings and more in one place.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
