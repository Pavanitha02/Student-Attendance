import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";

export default function ProtectedRoute({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session on mount
        authService.getSession()
            .then((response) => {
                if (response.error) {
                    setSession(null);
                } else {
                    setSession(response.data?.session || null);
                }
            })
            .catch((err) => {
                console.error("Auth session error:", err);
                setSession(null);
            })
            .finally(() => {
                setLoading(false);
            });

        // Listen to auth changes
        let subscription = null;
        try {
            const { data } = authService.onAuthStateChange(
                (_event, session) => {
                    setSession(session);
                    setLoading(false);
                }
            );
            subscription = data?.subscription;
        } catch (err) {
            console.warn("Could not subscribe to auth state changes", err);
        }

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session || !session.isLoggedIn) {
        // Check local storage isLoggedIn
        const activeSessionStr = localStorage.getItem('edu_session');
        const activeSession = activeSessionStr ? JSON.parse(activeSessionStr) : null;

        if (!activeSession?.isLoggedIn) {
            return <Navigate to="/login" replace />;
        }
    }

    // Render children if authenticated
    return children;
}
