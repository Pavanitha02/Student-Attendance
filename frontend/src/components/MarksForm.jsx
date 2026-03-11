import { Save } from "lucide-react";

export default function MarksForm({ formData, setFormData, marks, handleMarkChange, students, subjects, onSubmit }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">New Marks Entry</h2>
                <p className="text-sm text-gray-500 mt-1">Record test scores for a student</p>
            </div>

            <form onSubmit={onSubmit} className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Student Name</label>
                        <select
                            value={formData.studentName}
                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 appearance-none"
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Test Name</label>
                        <input
                            type="text"
                            value={formData.testName}
                            onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                            placeholder="e.g. Unit Test 1"
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                            required
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                        <h3 className="text-sm font-semibold text-gray-900">Enter Subject Marks</h3>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Maximum 100</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {subjects.map(subject => (
                            <div key={subject} className="bg-gray-50/50 p-4 flex flex-col items-center justify-center rounded-xl border border-gray-200 hover:border-blue-300 transition-colors group">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 group-hover:text-blue-600 transition-colors">{subject}</label>
                                <input
                                    type="text"
                                    maxLength="3"
                                    value={marks[subject]}
                                    onChange={(e) => handleMarkChange(subject, e.target.value)}
                                    placeholder="00"
                                    className="w-full text-center text-2xl font-black text-gray-900 border border-gray-300 rounded-lg px-2 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm placeholder-gray-300 transition-all"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                        <Save size={18} />
                        Submit Marks
                    </button>
                </div>
            </form>
        </div>
    );
}
