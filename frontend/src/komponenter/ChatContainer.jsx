import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";  // Importerar en hook för att hantera chatrelaterad state.
import MessageHead from "./MessageHead";  // Komponent som hanterar chatthuvudet (t.ex. användarinformation).
import MessageInput from "./MessageInput";  // Komponent för att skriva meddelanden.
import MessageSkelett from "./skelett/MessageSkelett";  // Komponent som visar en laddningsskärm (skelett) under hämtning.
import { useAuthStore } from "../store/useAuthStore";  // Hook för att hantera användarens auth-data.
import { formatMessageTime } from "../Lib/time";  // Funktion för att formatera tidsstämpeln för meddelanden.

const ChatContainer = () => {
  // Hämtar tillstånd från global state för meddelanden och användardata
  const { messages, getMessage, isMessagesLoading, selectedUser, subToMes, unsubFromMes } = useChatStore();
  const { authUser } = useAuthStore();

  // Hämtar meddelanden för den valda användaren när selectedUser ändras
  useEffect(() => {
    getMessage(selectedUser._id);
    subToMes();

    return() => unsubFromMes();
  }, [selectedUser._id, getMessage, subToMes, unsubFromMes]); // Hämtar meddelanden igen när selectedUser._id ändras

  // Om meddelandena laddas visas en skelett-animation
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <MessageHead /> 
        <MessageSkelett />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <MessageHead />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}  // Skillnad på chatbubblor baserat på vem som skickar
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilBild || "avatar.png" 
                      : selectedUser.profilBild || "avatar.png" 
                      
                  }
                  alt="profilBild"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex">
                {message.bild && (
                    <img
                        src={message.bild}
                        alt="bild"
                        className="sm:max-w-[200px] rounded-md mb-2"  // Visar bild om det finns en
                    />
                )}
                {message.text && <p>{message.text}</p>}  
            </div>
          </div>
        ))}
      </div>
      <MessageInput /> 
    </div>
  );
};

export default ChatContainer;
