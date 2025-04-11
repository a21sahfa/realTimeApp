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
    set({ isMessagesLoading: true });
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
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData); // Skickar meddelande till den valda användaren
      set({ messages: [...messages, res.data] }); // Lägger till det nya meddelandet i messages arrayen
    } catch (error) {
      toast.error(error.response.data.message); // Hanterar eventuella fel och visar ett toastmeddelande
    }
  },

  subToMes: () => {
    const { selectedUser } = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("nyMessage", (newMessage) => {
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
