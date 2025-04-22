import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkelett from "./skelett/sidebarSkelett";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkelett />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-gradient-to-b from-indigo-700 to-purple-800 text-white">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-indigo-300" />
          <span className="font-medium hidden lg:block text-indigo-200">Contacts</span>
        </div>
        {/* Optional Online filter toggle */}
        <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
          <span>Show Online Only</span>
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={() => setShowOnlineOnly(!showOnlineOnly)}
            className="bg-indigo-600 rounded-full p-2 text-indigo-100 cursor-pointer transition-colors"
          />
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-indigo-700 hover:ring-2 hover:ring-indigo-500 transition-colors duration-200
              ${selectedUser?._id === user._id ? "bg-indigo-600 ring-2 ring-indigo-500" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilBild || "/avatar.png"}
                alt={user.namn}
                className="size-12 object-cover rounded-full ring-4 ring-indigo-500"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.namn}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
