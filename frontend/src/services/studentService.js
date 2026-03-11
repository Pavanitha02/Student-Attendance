const STORAGE_KEY = 'edu_students';

export const studentService = {
    getStudents() {
        const students = localStorage.getItem(STORAGE_KEY);
        return students ? JSON.parse(students) : [];
    },

    addStudent(student) {
        const students = this.getStudents();
        const newStudent = { ...student, id: Date.now().toString() };
        students.push(newStudent);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
        return newStudent;
    },

    updateStudent(id, updatedData) {
        const students = this.getStudents();
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedData };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
            return students[index];
        }
        return null;
    },

    deleteStudent(id) {
        let students = this.getStudents();
        students = students.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
        return true;
    }
};
