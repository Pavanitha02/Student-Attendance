import { useState, useEffect } from "react";
import { PlusCircle, RotateCcw } from "lucide-react";

export default function StudentForm({ onSubmit, editingStudent, clearEdit }) {
    const defaultState = { name: "", rollNo: "", class: "10th", phone: "", subjects: [] };
    const [formData, setFormData] = useState(defaultState);

    const availableSubjects = ["Maths", "Science", "English", "Social", "Computers"];
    const classes = ["8th", "9th", "10th", "11th", "12th"];

    useEffect(() => {
        if (editingStudent) {
            setFormData(editingStudent);
        } else {
            setFormData(defaultState);
        }
    }, [editingStudent]);

    const handleSubjectChange = (subject) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
    };

    const handleClear = () => {
        setFormData(defaultState);
        if (clearEdit) clearEdit();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.subjects.length === 0) {
            alert("Please select at least one subject.");
            return;
        }
        onSubmit(formData);
        handleClear();
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                    {editingStudent ? "Edit Student Details" : "Register New Student"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the information below.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Student Name</label>
                        <input
                            type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                            placeholder="e.g. Rahul Sharma"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Roll Number</label>
                        <input
                            type="text" required value={formData.rollNo} onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                            placeholder="e.g. 101"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Class</label>
                        <select
                            value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })}
                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 appearance-none"
                        >
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Parent Phone Number</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-sm font-medium">
                                +91
                            </span>
                            <input
                                type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border border-gray-200 bg-gray-50/50 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="9876543210"
                                pattern="[0-9]{10}"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700">Enrolled Subjects</label>
                    <div className="flex flex-wrap gap-2.5">
                        {availableSubjects.map(subject => {
                            const selected = formData.subjects.includes(subject);
                            return (
                                <label
                                    key={subject}
                                    className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 flex items-center gap-2 select-none ${selected
                                            ? "bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-500/20"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selected}
                                        onChange={() => handleSubjectChange(subject)}
                                    />
                                    {subject}
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-4 flex gap-3 border-t border-gray-100">
                    <button
                        type="submit"
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <PlusCircle size={18} />
                        {editingStudent ? "Save Changes" : "Add Student"}
                    </button>
                    <button
                        type="button" onClick={handleClear}
                        className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} className="text-gray-400" />
                        Clear Form
                    </button>
                </div>
            </form>
        </div>
    );
}
