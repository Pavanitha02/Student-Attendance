import { Menu, Search, Bell, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        authService.getSession().then(({ data: { session } }) => {
            if (session?.user?.email) {
                setUserEmail(session.user.email);
            }
        });
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        navigate("/login");
    };

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 fixed top-0 right-0 left-0 lg:left-72 z-40 transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 lg:hidden text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden md:flex items-center relative text-gray-400 focus-within:text-gray-600">
                    <Search className="absolute left-3 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search students, marks..."
                        className="pl-9 pr-4 py-2 w-72 bg-gray-100/50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 transition-all outline-none text-gray-800"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                </button>

                <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md shadow-blue-500/20 ring-2 ring-white">
                            {userEmail ? userEmail.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div className="hidden sm:block text-left mr-1">
                            <p className="text-sm font-semibold text-gray-700 leading-tight">
                                {userEmail ? userEmail.split('@')[0] : "Admin User"}
                            </p>
                            <p className="text-xs text-gray-500">Teacher</p>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden text-sm">
                            <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                            </div>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                                <Settings size={16} className="text-gray-400" />
                                Account Settings
                            </button>
                            <div className="h-px bg-gray-100 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
