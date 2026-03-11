import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';

const Home = ({ records }) => {
    const navigate = useNavigate();

    // Process data for the dashboard cards
    const totalStudents = records && records.length > 0
        ? new Set(records.map(r => r.rollNumber)).size
        : 0;

    const presentToday = records && records.length > 0
        ? records.filter(r => {
            const today = new Date().toISOString().split('T')[0];
            return r.date === today && r.status === 'Present';
        }).length
        : 0;

    const totalRecords = records ? records.length : 0;

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to Student Attendance System</h1>
                <p>
                    Manage your students' attendance effortlessly. Mark daily attendance
                    and keep track of records with our professional admin dashboard.
                </p>
                <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => navigate('/mark-attendance')}>
                        Mark Attendance
                    </button>
                    <button className="btn-secondary" onClick={() => navigate('/view-attendance')}>
                        View Records
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                <DashboardCard
                    title="Total Students"
                    value={totalStudents}
                    icon="👥"
                />
                <DashboardCard
                    title="Present Today"
                    value={presentToday}
                    icon="✅"
                />
                <DashboardCard
                    title="Attendance Records"
                    value={totalRecords}
                    icon="📋"
                />
            </div>
        </div>
    );
};

export default Home;
