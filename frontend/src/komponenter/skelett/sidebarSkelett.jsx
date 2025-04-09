import { Users } from "lucide-react";

const SidebarSkelett = () => {
  // Skapa en array med 8 skelettobjekt (plats för 8 användare)
  const skelettKontakter = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header / rubrik */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Kontakter</span>
        </div>
      </div>

      {/* Skelettladdning för kontaktlista */}
      <div className="overflow-y-auto w-full py-3">
        {skelettKontakter.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar-skelett (profilbilds-placeholder) */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* Användarinformation – endast synlig på större skärmar */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" /> {/* Namn-placeholder */}
              <div className="skeleton h-3 w-16" />     {/* Senaste meddelande eller status */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkelett;
