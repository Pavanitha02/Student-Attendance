import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, FileSpreadsheet, FileBarChart, Settings, X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Students", path: "/students", icon: <Users size={20} /> },
        { name: "Attendance", path: "/attendance", icon: <CalendarCheck size={20} /> },
        { name: "Marks", path: "/marks", icon: <FileSpreadsheet size={20} /> },
        { name: "Reports", path: "/reports", icon: <FileBarChart size={20} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <>
            {/* Mobile/Tablet overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 min-h-[64px]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            EduManage
                        </span>
                    </div>
                    <button
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-4 py-6">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => {
                                        if (window.innerWidth < 1024) setIsOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                            ? "bg-blue-50/80 text-blue-700 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-blue-100"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <div className={`${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`}>
                                        {item.icon}
                                    </div>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Support Card at bottom */}
                <div className="mt-auto p-4 m-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 relative z-10">Need Help?</h4>
                    <p className="text-xs text-gray-600 mb-3 relative z-10">Please check our docs.</p>
                    <button className="w-full bg-white text-blue-600 text-xs font-semibold py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm relative z-10">
                        Documentation
                    </button>
                </div>
            </aside>
        </>
    );
}
