import { useState, useEffect } from "react";
import { Plus, History } from "lucide-react";
import MarksForm from "../components/MarksForm";
import MarksTable from "../components/MarksTable";
import { studentService } from "../services/studentService";
import { marksService } from "../services/marksService";

export default function Marks() {
    const [students, setStudents] = useState([]);
    const [subjects] = useState(["Maths", "Science", "English", "Social"]);

    const [formData, setFormData] = useState({
        studentName: "",
        testName: "",
        date: new Date().toISOString().split('T')[0],
        maxMarks: "100"
    });

    const [marks, setMarks] = useState({
        Maths: "", Science: "", English: "", Social: ""
    });

    const [marksHistory, setMarksHistory] = useState([]);

    const [activeTab, setActiveTab] = useState("entry"); // entry, history

    // Load data from services
    useEffect(() => {
        const loadedStudents = studentService.getStudents();
        setStudents(loadedStudents.map(s => s.name));

        const history = marksService.getMarksHistory();
        setMarksHistory(history);
    }, []);

    const handleMarkChange = (subject, value) => {
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setMarks({ ...marks, [subject]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.studentName || !formData.testName) {
            alert("Please fill in student name and test name");
            return;
        }

        // Find student ID
        const allStudents = studentService.getStudents();
        const student = allStudents.find(s => s.name === formData.studentName);

        const maxMarksNum = Number(formData.maxMarks);
        if (!maxMarksNum || maxMarksNum <= 0) {
            alert("Please enter a valid Maximum Marks value.");
            return;
        }

        // Validate individual subjects against maxMarks
        const invalidSubj = subjects.find(s => marks[s] !== "" && Number(marks[s]) > maxMarksNum);
        if (invalidSubj) {
            alert(`Marks for ${invalidSubj} (${marks[invalidSubj]}) cannot exceed Maximum Marks (${formData.maxMarks}).`);
            return;
        }

        const newEntry = {
            studentId: student ? student.id : null,
            ...formData,
            marks: { ...marks }
        };

        const addedEntry = marksService.addMarksEntry(newEntry);
        setMarksHistory([addedEntry, ...marksHistory]);

        setMarks({ Maths: "", Science: "", English: "", Social: "" });
        setFormData({ ...formData, studentName: "", testName: "" });
        setActiveTab("history");
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Marks Management</h1>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">Enter marks across subjects and view history</p>
                </div>

                <div className="flex bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
                    <button
                        onClick={() => setActiveTab("entry")}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${activeTab === "entry"
                            ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                            }`}
                    >
                        <Plus size={16} strokeWidth={2.5} /> Entry Form
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${activeTab === "history"
                            ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                            }`}
                    >
                        <History size={16} strokeWidth={2.5} /> View History
                    </button>
                </div>
            </div>

            {activeTab === "entry" ? (
                <MarksForm
                    formData={formData}
                    setFormData={setFormData}
                    marks={marks}
                    handleMarkChange={handleMarkChange}
                    students={students}
                    subjects={subjects}
                    onSubmit={handleSubmit}
                />
            ) : (
                <MarksTable history={marksHistory} />
            )}
        </div>
    );
}
