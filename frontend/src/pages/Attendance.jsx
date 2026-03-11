import { useState, useMemo, useEffect } from "react";
import { Calendar, Save, CheckCircle2, Users, UserX, CalendarHeart } from "lucide-react";
import AttendanceTable from "../components/AttendanceTable";
import { studentService } from "../services/studentService";
import { attendanceService } from "../services/attendanceService";

export default function Attendance() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSaved, setIsSaved] = useState(false);
    const [students, setStudents] = useState([]);
    const [absentAlerts, setAbsentAlerts] = useState([]);

    // Load students and their attendance for the selected date
    useEffect(() => {
        const allStudents = studentService.getStudents();
        const savedRecords = attendanceService.getAttendanceByDate(date);

        // Map records back to students or default to present
        const mergedStudents = allStudents.map(student => {
            const record = savedRecords.find(r => r.studentId === student.id);
            return {
                ...student,
                status: record ? record.status : "present"
            };
        });

        setStudents(mergedStudents);
    }, [date]);

    const handleStatusChange = (id, newStatus) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
        setIsSaved(false);
    };

    const markAll = (status) => {
        setStudents(students.map(s => ({ ...s, status })));
        setIsSaved(false);
    };

    const handleSave = () => {
        const records = students.map(s => ({ studentId: s.id, status: s.status }));
        attendanceService.saveAttendance(date, records);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);

        // Generate WhatsApp alerts
        const absentees = students.filter(s => s.status === 'absent');
        setAbsentAlerts(absentees);
    };

    // Calculate Summary
    const summary = useMemo(() => {
        return students.reduce((acc, student) => {
            acc[student.status] = (acc[student.status] || 0) + 1;
            return acc;
        }, { present: 0, absent: 0, holiday: 0 });
    }, [students]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Daily Attendance</h1>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">Record and manage student presence</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full sm:w-48 text-gray-900 bg-white shadow-sm font-semibold transition-all"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className={`px-6 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${isSaved
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                        {isSaved ? "Saved Successfully" : "Save Attendance"}
                    </button>
                </div>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-inset ring-emerald-100">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Present</p>
                        <p className="text-2xl font-bold text-gray-900">{summary.present}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center ring-1 ring-inset ring-rose-100">
                        <UserX size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Absent</p>
                        <p className="text-2xl font-bold text-gray-900">{summary.absent}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center ring-1 ring-inset ring-purple-100">
                        <CalendarHeart size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">On Holiday</p>
                        <p className="text-2xl font-bold text-gray-900">{summary.holiday}</p>
                    </div>
                </div>
            </div>

            <AttendanceTable
                students={students}
                onStatusChange={handleStatusChange}
                markAll={markAll}
                absentAlerts={absentAlerts}
                date={date}
                onAlertSent={(id) => setAbsentAlerts(prev => prev.filter(s => s.id !== id))}
            />
        </div>
    );
}
