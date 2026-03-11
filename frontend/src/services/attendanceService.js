const STORAGE_KEY = 'edu_attendance';

export const attendanceService = {
    getAttendanceByDate(date) {
        const allAttendance = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return allAttendance[date] || [];
    },

    saveAttendance(date, records) {
        // records should be an array of: { studentId, status }
        const allAttendance = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        allAttendance[date] = records;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allAttendance));
        return true;
    },

    // Calculate summary for a specific date
    getSummary(date) {
        const records = this.getAttendanceByDate(date);
        return records.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
        }, { present: 0, absent: 0, holiday: 0 });
    },

    sendAbsentNotification(studentName, parentPhone, date) {
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        });

        const text = `Hello,

This is a notification from the Tuition Centre.

Your child *${studentName}* was absent today.

Date: ${formattedDate}

Please ensure regular attendance.

Thank you.`;

        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/${parentPhone}?text=${encodedText}`;

        window.open(url, "_blank");
    }
};
