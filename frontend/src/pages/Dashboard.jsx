import { Users, UserX, UserCheck, FileSpreadsheet } from "lucide-react";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
    const activities = [
        { id: 1, name: "Rahul Sharma", action: "marked present", date: "Today, 09:30 AM", type: "attendance" },
        { id: 2, name: "Anita Desai", action: "scored 90 in Maths", date: "Today, 11:15 AM", type: "marks" },
        { id: 3, name: "Priya Singh", action: "was registered", date: "Yesterday, 02:40 PM", type: "student" },
        { id: 4, name: "Amit Kumar", action: "marked absent", date: "Yesterday, 09:15 AM", type: "attendance" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-sm sm:text-base text-gray-500 mt-1">Monitor daily attendance and student performance</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <DashboardCard
                    title="Total Students"
                    value="145"
                    subtext="+4 this month"
                    icon={<Users size={24} strokeWidth={2.5} />}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    trendColor="text-blue-600"
                />
                <DashboardCard
                    title="Present Today"
                    value="132"
                    subtext="91% of total"
                    icon={<UserCheck size={24} strokeWidth={2.5} />}
                    iconBg="bg-emerald-50"
                    iconColor="text-emerald-600"
                    trendColor="text-emerald-600"
                />
                <DashboardCard
                    title="Absent Today"
                    value="13"
                    subtext="-2% from yesterday"
                    icon={<UserX size={24} strokeWidth={2.5} />}
                    iconBg="bg-rose-50"
                    iconColor="text-rose-600"
                    trendColor="text-rose-500"
                />
                <DashboardCard
                    title="Total Tests Conducted"
                    value="24"
                    subtext="2 scheduled this week"
                    icon={<FileSpreadsheet size={24} strokeWidth={2.5} />}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-600"
                    trendColor="text-purple-600"
                />
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800 tracking-tight">Recent Activity</h2>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-100">
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Activity</th>
                                <th className="px-6 py-4 text-right">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {activities.map(activity => (
                                <tr key={activity.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {activity.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{activity.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{activity.action}</td>
                                    <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">{activity.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
