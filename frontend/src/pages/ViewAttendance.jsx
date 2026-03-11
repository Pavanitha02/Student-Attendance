import AttendanceTable from '../components/AttendanceTable';

const ViewAttendance = ({ records }) => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>All Attendance Records</h2>
            <AttendanceTable records={records} />
        </div>
    );
};

export default ViewAttendance;
