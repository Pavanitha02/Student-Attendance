import { useState, useEffect } from "react";
import { MessageCircle, Download, FileText, CheckCircle2 } from "lucide-react";
import { studentService } from "../services/studentService";
import { attendanceService } from "../services/attendanceService";
import { marksService } from "../services/marksService";

export default function Reports() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = () => {
            const allStudents = studentService.getStudents();

            // Get all possible attendance dates to calculate total days
            const attendanceDataStr = localStorage.getItem('edu_attendance') || '{}';
            const allAttendance = JSON.parse(attendanceDataStr);
            const totalRecordedDays = Object.keys(allAttendance).length || 25; // Default to 25 if no records

            const generatedReports = allStudents.map(student => {
                // Calculate attendance
                let presentCount = 0;
                Object.values(allAttendance).forEach(dayRecords => {
                    const record = dayRecords.find(r => r.studentId === student.id);
                    if (record && record.status === 'present') {
                        presentCount++;
                    }
                });

                // Get latest marks
                const studentMarksHistory = marksService.getMarksByStudent(student.id);
                const latestMarks = studentMarksHistory.length > 0 ? studentMarksHistory[0].marks : { Maths: "-", Science: "-", English: "-", Social: "-" };

                // Calculate Grade
                let grade = "N/A";
                let status = "No Data";
                const validMarks = Object.values(latestMarks).filter(m => m !== "-" && m !== "");
                if (validMarks.length > 0) {
                    // Calculate Total and Percentage for WhatsApp
                    let totalMarks = 0;
                    let percentageStr = "0%";
                    let maxTotalStr = "0";

                    if (validMarks.length > 0) {
                        const avg = validMarks.reduce((a, b) => Number(a) + Number(b), 0) / validMarks.length;
                        if (avg >= 90) { grade = "A+"; status = "Outstanding"; }
                        else if (avg >= 80) { grade = "A"; status = "Excellent"; }
                        else if (avg >= 70) { grade = "B"; status = "Good"; }
                        else if (avg >= 60) { grade = "C"; status = "Average"; }
                        else { grade = "D"; status = "Needs Improvement"; }

                        const latestTest = studentMarksHistory[0];
                        const maxMarks = Number(latestTest.maxMarks) || 100;
                        totalMarks = validMarks.reduce((a, b) => Number(a) + Number(b), 0);
                        const maxTotal = maxMarks * Object.keys(latestTest.marks).filter(k => latestTest.marks[k] !== "").length;
                        maxTotalStr = maxTotal.toString();

                        const pct = (totalMarks / maxTotal) * 100;
                        percentageStr = `${pct.toFixed(2)}%`;
                    }

                    return {
                        id: student.id,
                        studentName: student.name,
                        rollNo: student.rollNo,
                        parentPhone: student.phone || "919876543210", // Fallback if missing
                        attendance: `${presentCount} / ${totalRecordedDays}`,
                        marks: latestMarks,
                        testName: studentMarksHistory.length > 0 ? studentMarksHistory[0].testName : "N/A",
                        maxMarks: studentMarksHistory.length > 0 ? (studentMarksHistory[0].maxMarks || "100") : "100",
                        totalMarks: totalMarks,
                        maxTotal: maxTotalStr,
                        percentage: percentageStr,
                        grade,
                        status
                    };
                }
            });

            setReports(generatedReports);
        };

        fetchReports();
    }, []);

    const handleShareWhatsApp = (report) => {
        const text = `Hello,

Your child *${report.studentName}*'s performance report:

Test: ${report.testName}
Maximum Marks: ${report.maxMarks}

*Marks:*
Maths: ${report.marks.Maths}
Science: ${report.marks.Science}
English: ${report.marks.English}
Social: ${report.marks.Social}

Total: ${report.totalMarks} / ${report.maxTotal}
Percentage: ${report.percentage}

Thank you.`;

        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/${report.parentPhone}?text=${encodedText}`;

        window.open(url, "_blank");
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Student Reports</h1>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">Review performance and share updates with parents</p>
                </div>

                <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <Download size={18} />
                    Export All (PDF)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gradient-to-br from-white to-gray-50/50">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl ring-4 ring-blue-50 shadow-sm relative">
                                    {report.studentName.charAt(0)}
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                        <CheckCircle2 size={14} className="text-emerald-500" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{report.studentName}</h3>
                                    <p className="text-sm font-medium text-gray-500">Roll No: {report.rollNo}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${report.grade.includes('A') ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200' :
                                    report.grade.includes('B') ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200' :
                                        'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-200'
                                    }`}>
                                    Grade {report.grade}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Attendance</p>
                                    <p className="text-lg font-bold text-gray-900">{report.attendance}</p>
                                </div>
                                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">{report.status}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject Scores</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                    {Object.entries(report.marks).map(([subject, mark]) => (
                                        <div key={subject} className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-center">
                                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1 truncate">{subject}</p>
                                            <p className="font-black text-gray-900">{mark}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleShareWhatsApp(report)}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <MessageCircle size={18} />
                                    Share on WhatsApp
                                </button>
                                <button className="px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group-hover:text-blue-600">
                                    <FileText size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
