import React, { useState } from 'react'; 
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, User, Mail, EyeOff, Eye, Lock, Loader2 } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namn: "",
    email: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.namn.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) register(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-gray-800">Create Account</h1>
              <p className="text-sm text-gray-500">Start your journey with us</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 bg-white text-gray-900"
                  placeholder="Your name"
                  value={formData.namn}
                  onChange={(e) => setFormData({ ...formData, namn: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-white text-gray-900"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 bg-white text-gray-900"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Link to login */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right panel (optional illustration or text) */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-50">
        <div className="text-center px-10">
          <h2 className="text-3xl font-bold text-indigo-600">Join the community</h2>
          <p className="mt-4 text-gray-500">Collaborate, share, and grow with others just like you.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
