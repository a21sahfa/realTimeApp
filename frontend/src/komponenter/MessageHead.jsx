import { X } from "lucide-react";  // Importerar X-ikonen för att stänga chatten
import { useAuthStore } from "../store/useAuthStore";  // Hämtar auth store för att kolla användares status
import { useChatStore } from "../store/useChatStore";  // Hämtar chat store för att hantera vald användare

const MessageHead = () => {
  // Hämtar den valda användaren och setSelectedUser från chat store
  const { selectedUser, setSelectedUser } = useChatStore();
  
  // Hämtar lista över online användare från auth store
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Profilbild av vald användare */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilBild || "/avatar.png"} alt={selectedUser.namn} />
            </div>
          </div>

          <div>
            {/* Visar vald användares namn */}
            <h3 className="font-medium">{selectedUser.namn}</h3>
            <p className="text-sm text-base-content/70">
              {/* Visar om användaren är online eller offline */}
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Stänger chatt genom att sätta selectedUser till null */}
        <button onClick={() => setSelectedUser(null)}>
          <X />  {/* Stäng-ikon */}
        </button>
      </div>
    </div>
  );
};
export default MessageHead;
