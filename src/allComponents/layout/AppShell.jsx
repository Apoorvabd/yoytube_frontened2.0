import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppShell({ children, onSearch }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar onSearch={onSearch} />
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[auto_1fr] lg:px-6">
        <Sidebar />
        <main className="min-w-0 space-y-6">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;