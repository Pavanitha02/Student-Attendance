import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { useNavigate } from "react-router-dom";
import { studentService } from "../services/studentService";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setStudents(studentService.getStudents());
    }, []);

    const handleAddOrEdit = (studentData) => {
        if (editingStudent) {
            const updated = studentService.updateStudent(editingStudent.id, studentData);
            if (updated) {
                setStudents(students.map(s => s.id === updated.id ? updated : s));
            }
        } else {
            const added = studentService.addStudent(studentData);
            setStudents([added, ...students]);
        }
        setEditingStudent(null);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this student profile?")) {
            if (studentService.deleteStudent(id)) {
                setStudents(students.filter(s => s.id !== id));
            }
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleViewReport = (student) => {
        // Navigate to reports page
        navigate('/reports');
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Student Management</h1>
                <p className="text-sm sm:text-base text-gray-500 mt-1">Register, edit, and view student profiles</p>
            </div>

            <StudentForm
                onSubmit={handleAddOrEdit}
                editingStudent={editingStudent}
                clearEdit={() => setEditingStudent(null)}
            />

            <StudentTable
                students={students}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewReport={handleViewReport}
            />
        </div>
    );
}
