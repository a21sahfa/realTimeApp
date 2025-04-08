import { create } from "zustand";
import { axiosInstance } from "../Lib/axios.js";
import toast from "react-hot-toast";



export const useAuthStore = create((set) => ({
    authUser:null, 
    isRegistering: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    
    isCheckingAuth:true,

    checkAuth : async ()=> {
        try {
            const res = await axiosInstance.get("/auth/check");
            set ({authUser:res.data})
             
        } catch (error) {
            console.log("error in checkAuth:", error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth: false});
        }
    },

    register: async (data) => {
        set ({ isRegistering: true });

        try {
            const res = await axiosInstance.post("/auth/register", data);
            toast.success("kontot har skapats");
            set({ authUser: res.data });
      
            set({authUser: res.data});
        } catch (error) {
            console.error("❌ Register error:", error); // ✅ This will show us the real error
            toast.error(error?.response?.data?.message || "Något gick fel. Försök igen.");
              
        } finally{
            set({ isRegistering: false });

        }

    },
})); 