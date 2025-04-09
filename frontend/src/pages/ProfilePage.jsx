import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, isUpdatingProBild, updateProBild } = useAuthStore(); // Hämtar användardata och funktion för uppdatering
  const [selectedImg, setSelectedImg] = useState(null); // Håller reda på den valda bilden

  const handleBildUpload = async (e) => {
    const file = e.target.files[0]; // Hämtar filen från inputfältet
    if (!file) return; // Om ingen fil valts, gör inget

    const reader = new FileReader(); // Skapar en fil-läsare

    reader.readAsDataURL(file); // Läser filen som en base64-sträng

    reader.onload = async () => { // När läsningen är klar
      const base64Bild = reader.result; // Sparar base64-strängen
      setSelectedImg(base64Bild); // Sätter vald bild
      await updateProBild({ profilBild: base64Bild }); // Uppdaterar användarens profilbild
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilBild || "/avatar.png"} // Visar vald bild eller användarens profilbild
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProBild ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleBildUpload} // Triggerar handleBildUpload när användaren väljer en bild
                  disabled={isUpdatingProBild} // Disablerar input om uppdateringen pågår
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProBild ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.namn}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Visar när användaren skapade sitt konto */}
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span> {/* Kontostatus */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
