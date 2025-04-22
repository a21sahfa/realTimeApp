import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, isUpdatingProBild, updateProBild } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleBildUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Bild = reader.result;
      setSelectedImg(base64Bild);
      await updateProBild({ profilBild: base64Bild });
    };
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-2xl mx-auto p-8 pt-20">
        <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 rounded-2xl p-10 space-y-12 shadow-lg backdrop-blur-xl bg-opacity-30">

          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-indigo-400 tracking-wide">Profile</h1>
            <p className="mt-2 text-gray-300">Manage your personal information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilBild || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-indigo-500 shadow-xl transition-all duration-300 transform group-hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full cursor-pointer transition-all duration-300 
                  hover:bg-indigo-600 group-hover:scale-110 group-hover:shadow-lg ${isUpdatingProBild ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleBildUpload}
                  disabled={isUpdatingProBild}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProBild ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-8">
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-5 h-5" />
                Full Name
              </label>
              <p className="mt-2 px-4 py-2.5 bg-transparent border-2 border-indigo-500 rounded-lg text-white">
                {authUser?.namn}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Address
              </label>
              <p className="mt-2 px-4 py-2.5 bg-transparent border-2 border-indigo-500 rounded-lg text-white">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-medium text-white mb-4">Account Information</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center justify-between py-2 border-b border-indigo-500">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
