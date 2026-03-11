import { useState } from 'react';

const AttendanceForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        rollNumber: '',
        date: '',
        status: 'Present',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.studentName || !formData.rollNumber || !formData.date) {
            alert("Please fill all fields");
            return;
        }
        onSubmit(formData);
        setFormData({ studentName: '', rollNumber: '', date: '', status: 'Present' });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="studentName">Student Name</label>
                    <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Enter student name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rollNumber">Roll Number</label>
                    <input
                        type="text"
                        id="rollNumber"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        placeholder="Enter roll number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit">Submit Attendance</button>
            </form>
        </div>
    );
};

export default AttendanceForm;
