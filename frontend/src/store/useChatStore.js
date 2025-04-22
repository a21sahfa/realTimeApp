import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  renderStartTime: null,


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessage: async (userId) => {
    set({ isMessagesLoading: true, renderStartTime: performance.now() }); // Start timing
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const timings = get().timings || [];
  
    const start = performance.now();
  
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser.id}`, messageData);
      const end = performance.now();
      const duration = end - start;
      timings.push(duration);
  
      console.log(`⏱️ Message write time: ${duration.toFixed(2)} ms`);
  
      // DO NOT add message to messages[] yet
      set({ timings });
  
      if (timings.length >= 400) {
        const blob = new Blob([JSON.stringify(timings)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "write_timings.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Message send error:", error);
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },
  
 


  subToMes: () => {
    const { selectedUser } = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("nyMessage", (newMessage) => {
      if(newMessage.senderId !== selectedUser.id) return;
      set({
        messages: [...get().messages,newMessage],
      });
    });
  },

  unsubFromMes : () => {
    const socket = useAuthStore.getState().socket
    socket.off("nyMessage");
  },
  
  setSelectedUser: (selectedUser) => set({ selectedUser }), // Uppdaterar den valda användaren i store
  
}));
