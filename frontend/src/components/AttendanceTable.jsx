import { Users, AlertCircle, Send } from "lucide-react";
import { attendanceService } from "../services/attendanceService";

export default function AttendanceTable({ students, onStatusChange, markAll, absentAlerts = [], date, onAlertSent }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {absentAlerts.length > 0 && (
                <div className="p-4 bg-orange-50 border-b border-orange-100 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-orange-800 font-semibold">
                        <AlertCircle size={20} />
                        <span>{absentAlerts.length} Absent Student(s) Require Actions</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {absentAlerts.map(student => (
                            <button
                                key={student.id}
                                onClick={() => {
                                    attendanceService.sendAbsentNotification(student.name, student.parentPhone || student.phone || "919876543210", date);
                                    if (onAlertSent) onAlertSent(student.id);
                                }}
                                className="px-3 py-1.5 bg-white border border-orange-200 text-orange-700 hover:bg-orange-100 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                                <Send size={14} /> Notify {student.name}'s Parent
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Users size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Class 10th Row</h2>
                        <p className="text-sm text-gray-500">{students.length} Students</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => markAll("present")}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-sm font-semibold transition-colors border border-emerald-200"
                    >
                        Mark All Present
                    </button>
                    <button
                        onClick={() => markAll("holiday")}
                        className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold transition-colors border border-purple-200"
                    >
                        Mark All Holiday
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-gray-500 font-semibold tracking-wide text-xs uppercase">
                            <th className="px-6 py-4 w-1/4">Student Name</th>
                            <th className="px-6 py-4 w-1/4">Roll Number</th>
                            <th className="px-6 py-4 w-1/2">Attendance Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {students.map(student => (
                            <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-6 py-4 font-semibold text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{student.rollNo}</td>
                                <td className="px-6 py-4 text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border transition-all duration-200 select-none ${student.status === "present"
                                            ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold ring-1 ring-emerald-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}>
                                            <input
                                                type="radio" name={`status-${student.id}`}
                                                value="present" checked={student.status === "present"}
                                                onChange={() => onStatusChange(student.id, "present")}
                                                className="w-4 h-4 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
                                            />
                                            Present
                                        </label>
                                        <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border transition-all duration-200 select-none ${student.status === "absent"
                                            ? "bg-rose-50 border-rose-200 text-rose-700 font-bold ring-1 ring-rose-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}>
                                            <input
                                                type="radio" name={`status-${student.id}`}
                                                value="absent" checked={student.status === "absent"}
                                                onChange={() => onStatusChange(student.id, "absent")}
                                                className="w-4 h-4 text-rose-600 accent-rose-600 focus:ring-rose-500"
                                            />
                                            Absent
                                        </label>
                                        <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border transition-all duration-200 select-none ${student.status === "holiday"
                                            ? "bg-purple-50 border-purple-200 text-purple-700 font-bold ring-1 ring-purple-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}>
                                            <input
                                                type="radio" name={`status-${student.id}`}
                                                value="holiday" checked={student.status === "holiday"}
                                                onChange={() => onStatusChange(student.id, "holiday")}
                                                className="w-4 h-4 text-purple-600 accent-purple-600 focus:ring-purple-500"
                                            />
                                            Holiday
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
