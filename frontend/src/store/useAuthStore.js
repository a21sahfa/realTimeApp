import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({  // lade till `get` eftersom det används i login-funktionen
    authUser: null, // Användardata
    isRegistering: false, // Status för registrering
    isLoggarIn: false, // Det här ska användas i login – korrekt namn
    isUpdatingProBild: false, // Kan användas i profilsidan senare
    isCheckingAuth: true, // När appen startar, kontrollerar om användaren redan är inloggad
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // Kontrollera om användaren är autentiserad
            set({ authUser: res.data }); // Om ja, spara användaren i Zustand
        } catch (error) {
            console.log("error i checkAuth:", error); // Om inte, logga ut
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false }); // Klart med kontrollen
        }
    },

    register: async (data) => {
        set({ isRegistering: true });

        try {
            const res = await axiosInstance.post("/auth/register", data);
            toast.success("kontot har skapats");
            set({ authUser: res.data }); // Logga in användaren direkt efter registrering
        } catch (error) {
            toast.error(error?.response?.data?.message || "Något gick fel. Försök igen.");
        } finally {
            set({ isRegistering: false });
        }
    },

    login: async (data) => {
        set({ isLoggarIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Loggedes in");
    
            // kontrollera att connectSocket finns innan du anropar
            const connectSocket = get().connectSocket;
            if (typeof connectSocket === "function") {
                connectSocket();
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Kunde inte logga in.");
        } finally {
            set({ isLoggarIn: false });
        }
    },
    
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null }); // Töm användaren
            toast.success("loggades ut");
        } catch (error) {
            toast.error(error.response?.data?.message || "Kunde inte logga ut.");
        }
    },

    updateProBild: async (data) => {
        set({ isUpdatingProBild: true });  // Indikerar att en uppdatering pågår
    
        try {
            const res = await axiosInstance.put("/auth/updateraBild", data);  // Skickar PUT-förfrågan till backend
            set({ authUser: res.data });  // Uppdaterar användarens data med ny profilbild
            toast.success("Profilbilden uppdaterades");  // Visar framgångsmeddelande
        } catch (error) {
            console.log("Error i updatera profil:", error);  // Loggar eventuellt fel
            toast.error(error.response.data.message);  // Visar felmeddelande från servern
        } finally {
            set({ isUpdatingProBild: false });  // Återställer statusen när uppdateringen är klar
        }
    },
        
}));
