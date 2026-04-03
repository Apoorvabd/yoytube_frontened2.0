import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

function AppShell({ children, onSearch }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-foreground transition-colors duration-500 pb-16 lg:pb-0">
      <Navbar onSearch={onSearch} />
      <div className="mx-auto flex w-full max-w-[1700px] gap-0 lg:gap-6 px-0 md:px-4 py-0 md:py-4 transition-all duration-300 mb-16 lg:mb-0">
        <Sidebar aria-label="Main Navigation" />
        <main className="flex-1 min-w-0 px-4 py-4 md:py-8 md:p-0">
          <div
            key={location.pathname}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out"
          >
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation Bar (Responsive addition) */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around border-t border-border bg-background/95 p-2 backdrop-blur-lg lg:hidden">
        <Sidebar isMobileNav />
      </div>
    </div>
  );
}

export default AppShell;