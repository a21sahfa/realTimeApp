import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";  // Importerar chat-relaterad store
import { Image, Send, X } from "lucide-react";  // Importerar ikoner för bild, skicka och ta bort
import toast from "react-hot-toast";  // Importerar toast för att visa felmeddelanden

const MessageInput = () => {
    // State för att hålla meddelandets text och bifogad bild
    const [text, setText] = useState("");  
    const [bifogadBild, setBifogadBild] = useState(null);
    const bildInputRef = useRef(null);  // Ref för att hantera bildinputfältet
    
    const { sendMessage } = useChatStore();  // Hämtar sendMessage-funktionen från chat store

    // Hanterar när en bild väljs via inputfältet
    const hanteraBild = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {  // Kollar om filen är en bild
            toast.error("välj en bild");  // Visar felmeddelande om det inte är en bild
            return;
        }

        const reader = new FileReader();  // Skapar en fil-läsare för att konvertera bilden till base64
        reader.onloadend = () => {
            setBifogadBild(reader.result);  // Sätter bilden som state
        };
        reader.readAsDataURL(file);  // Läser filen som en base64-sträng
    };

    // Tar bort den bifogade bilden
    const deleteBild = () => {
        setBifogadBild(null);  // Rensar bilden från state
        if (bildInputRef.current) bildInputRef.current.value = "";  // Rensar inputfältet
    };

    // Hanterar skicka meddelande-funktionen
    const hanteraSendMessage = async (e) => {
        e.preventDefault();  // Förhindrar standard formulärsändning
        if (!text.trim() && !bifogadBild) return;  // Om ingen text eller bild finns, gör inget
    
        try {
            // Skickar meddelandet till chat store
            await sendMessage({
              text: text.trim(),  // Skickar meddelandets text
              bild: bifogadBild,  // Skickar meddelandets bild om den finns
            });
      
            // Tömmer formuläret efter att meddelandet skickats
            setText("");  
            setBifogadBild(null);  
            if (bildInputRef.current) bildInputRef.current.value = "";  // Rensar inputfältet
          } catch (error) {
            console.error("kunde inte skicka message:", error);  // Loggar eventuella fel
          }
    };

  return (
    <div className="p-4 w-full">
    {/* Visar en förhandsvisning av den bifogade bilden */}
    {bifogadBild && (
      <div className="mb-3 flex items-center gap-2">
        <div className="relative">
          <img
            src={bifogadBild}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={deleteBild}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex items-center justify-center"
            type="button"
          >
            <X className="size-3" />  {/* Ta bort-ikon */}
          </button>
        </div>
      </div>
    )}

    {/* Formulär för att skriva meddelanden */}
    <form onSubmit={hanteraSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
        {/* Textfält för att skriva meddelande */}
        <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}  // Uppdaterar text-staten när användaren skriver
          />

        {/* Osynligt inputfält för att välja en bild */}
        <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={bildInputRef}
            onChange={hanteraBild}  // Hanterar bildvalet
        />

          {/* Button för att öppna bildväljaren */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${bifogadBild ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => bildInputRef.current?.click()}  // Öppnar bildväljaren när användaren klickar på knappen
          >
            <Image size={20} />  {/* Bild-ikon */}
          </button>
        </div>

        {/* Skicka meddelande-knapp */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !bifogadBild}  // Knappen är inaktiv om det inte finns någon text eller bild
        >
          <Send size={22} />  {/* Skicka-ikon */}
        </button>
    </form>
    </div>
  );
};

export default MessageInput;
