import AttendanceForm from '../components/AttendanceForm';
import AttendanceTable from '../components/AttendanceTable';

const MarkAttendance = ({ onAddRecord, records }) => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Mark Attendance</h2>
            <AttendanceForm onSubmit={onAddRecord} />

            <h3 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1.5rem' }}>
                Recent Records
            </h3>
            <AttendanceTable records={records} />
        </div>
    );
};

export default MarkAttendance;
