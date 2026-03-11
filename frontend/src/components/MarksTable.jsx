import { Search } from "lucide-react";

export default function MarksTable({ history }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">Submission History</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-gray-500 font-semibold tracking-wide text-xs uppercase">
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4">Test Name</th>
                            <th className="px-6 py-4 text-center">Maths</th>
                            <th className="px-6 py-4 text-center">Science</th>
                            <th className="px-6 py-4 text-center">English</th>
                            <th className="px-6 py-4 text-center">Social</th>
                            <th className="px-6 py-4 text-center bg-gray-100/50">Max</th>
                            <th className="px-6 py-4 text-center bg-gray-100/50 text-blue-800">Total</th>
                            <th className="px-6 py-4 text-center bg-blue-50/50 text-blue-800">%</th>
                            <th className="px-6 py-4 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {history.length > 0 ? (
                            history.map(entry => {
                                const maxMarks = Number(entry.maxMarks) || 100;

                                // Calculate Total
                                const subjectKeys = Object.keys(entry.marks);
                                const validMarks = subjectKeys
                                    .map(k => entry.marks[k])
                                    .filter(m => m !== "" && !isNaN(Number(m)));

                                const totalMarks = validMarks.reduce((sum, val) => sum + Number(val), 0);
                                const maxTotal = maxMarks * subjectKeys.length;
                                const percentage = validMarks.length > 0 ? ((totalMarks / maxTotal) * 100).toFixed(2) : 0;

                                return (
                                    <tr key={entry.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-900">{entry.studentName}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">{entry.testName}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex justify-center min-w-[2.5rem] bg-gray-100 text-gray-800 rounded px-2 py-1 font-bold text-sm">
                                                {entry.marks.Maths || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex justify-center min-w-[2.5rem] bg-gray-100 text-gray-800 rounded px-2 py-1 font-bold text-sm">
                                                {entry.marks.Science || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex justify-center min-w-[2.5rem] bg-gray-100 text-gray-800 rounded px-2 py-1 font-bold text-sm">
                                                {entry.marks.English || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex justify-center min-w-[2.5rem] bg-gray-100 text-gray-800 rounded px-2 py-1 font-bold text-sm">
                                                {entry.marks.Social || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center bg-gray-50/50 text-gray-500 font-semibold">{maxMarks}</td>
                                        <td className="px-6 py-4 text-center bg-gray-50/50 font-black text-gray-900">{totalMarks}</td>
                                        <td className="px-6 py-4 text-center bg-blue-50/30">
                                            <span className={`font-bold ${percentage >= 80 ? 'text-emerald-600' : percentage >= 50 ? 'text-blue-600' : 'text-rose-600'}`}>
                                                {percentage}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-500 font-medium">{new Date(entry.date).toLocaleDateString()}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <Search size={40} className="mb-3 text-gray-300" />
                                        <p className="text-base font-medium text-gray-900">No marks history available</p>
                                        <p className="text-sm">Submit your first entry using the form.</p>
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
