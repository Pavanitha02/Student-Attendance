import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50/50 overflow-hidden font-sans text-gray-900">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-18rem)]">
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

                {/* Scrollable Page Content - added pt-16 for fixed navbar */}
                <main className="flex-1 overflow-y-auto pt-16 px-4 pb-12 sm:px-6 lg:px-8 custom-scrollbar">
                    <div className="max-w-[1400px] mx-auto py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
