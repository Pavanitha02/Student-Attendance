import { Edit2, Trash2, FileText, Search } from "lucide-react";
import { useState } from "react";

export default function StudentTable({ students, onEdit, onDelete, onViewReport }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterClass, setFilterClass] = useState("All");

    const classes = ["8th", "9th", "10th", "11th", "12th"];

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.includes(searchTerm);
        const matchesClass = filterClass === "All" || student.class === filterClass;
        return matchesSearch && matchesClass;
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
            {/* Table Header Controls */}
            <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full border border-gray-200 bg-white rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm font-medium text-gray-500 hidden sm:block">Filter by:</span>
                    <select
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full sm:w-auto font-medium text-gray-700"
                    >
                        <option value="All">All Classes</option>
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm min-w-[900px]">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-gray-500 font-semibold tracking-wide">
                            <th className="px-6 py-4 uppercase text-xs">Student Name</th>
                            <th className="px-6 py-4 uppercase text-xs">Roll Number</th>
                            <th className="px-6 py-4 uppercase text-xs">Class</th>
                            <th className="px-6 py-4 uppercase text-xs">Parent Phone</th>
                            <th className="px-6 py-4 uppercase text-xs">Subjects</th>
                            <th className="px-6 py-4 uppercase text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map(student => (
                                <tr key={student.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {student.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-gray-900">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{student.rollNo}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-bold">
                                            {student.class}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">+91 {student.phone}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {student.subjects.map(sub => (
                                                <span key={sub} className="bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded text-[11px] font-semibold items-center flex shadow-sm">
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onViewReport(student)}
                                                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors tooltip"
                                                title="View Report"
                                            >
                                                <FileText size={18} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => onEdit(student)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip"
                                                title="Edit Student"
                                            >
                                                <Edit2 size={18} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(student.id)}
                                                className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip"
                                                title="Delete Student"
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <Search size={40} className="mb-3 text-gray-300" />
                                        <p className="text-base font-medium text-gray-900">No students found</p>
                                        <p className="text-sm">Try adjusting your search or filter.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
