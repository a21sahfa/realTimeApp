import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageHead from "./MessageHead";
import MessageInput from "./MessageInput";
import MessageSkelett from "./skelett/MessageSkelett";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../Lib/time";

const ChatContainer = () => {
  const { messages, getMessage, isMessagesLoading, selectedUser, subToMes, unsubFromMes } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessage(selectedUser.id);
    subToMes();
    return () => unsubFromMes();
  }, [selectedUser.id, getMessage, subToMes, unsubFromMes]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white rounded-r-2xl">
        <MessageHead />
        <MessageSkelett />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white rounded-r-2xl border-l border-gray-700">
      <MessageHead />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => {
          const isOwn = String(message.senderId) === String(authUser.id);
          return (
            <div
              key={message.id}
              className={`chat ${isOwn ? "chat-end" : "chat-start"} transition-all duration-200`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full ring-2 ring-indigo-600 shadow-md">
                  <img
                    src={
                      isOwn
                        ? authUser.profilBild || "/avatar.png"
                        : selectedUser.profilBild || "/avatar.png"
                    }
                    alt="profilBild"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs text-zinc-400">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div
                className={`chat-bubble text-sm shadow-md p-4 ${
                  isOwn
                    ? "bg-gradient-to-br from-indigo-600 to-blue-700 text-white"
                    : "bg-gradient-to-br from-purple-700 to-indigo-800 text-white"
                } rounded-xl max-w-xs sm:max-w-md`}
              >
                {message.bild && (
                  <img
                    src={message.bild}
                    alt="bild"
                    className="rounded-md mb-2 max-w-full border border-zinc-700"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
