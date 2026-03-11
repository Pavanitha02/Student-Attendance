const STORAGE_KEY = 'edu_marks';

export const marksService = {
    getMarksHistory() {
        const marks = localStorage.getItem(STORAGE_KEY);
        return marks ? JSON.parse(marks) : [];
    },

    addMarksEntry(entry) {
        // entry: { studentId, studentName, testName, date, marks: { maths, science, english, social } }
        const history = this.getMarksHistory();
        const newEntry = { ...entry, id: Date.now().toString() };

        // Add to beginning of array for newest-first display
        history.unshift(newEntry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return newEntry;
    },

    getMarksByStudent(studentId) {
        const history = this.getMarksHistory();
        return history.filter(h => h.studentId === studentId);
    }
};
