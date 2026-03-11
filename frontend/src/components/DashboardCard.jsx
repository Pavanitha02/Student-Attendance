export default function DashboardCard({ title, value, subtext, icon, trendColor = "text-gray-500", iconBg = "bg-blue-50", iconColor = "text-blue-600" }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${iconBg} ${iconColor} ring-1 ring-inset ring-black/5 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{value}</h3>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <p className={`text-xs font-medium ${trendColor}`}>{subtext}</p>
            </div>
        </div>
    );
}
