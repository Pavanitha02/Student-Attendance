export const authService = {
    async register(email, password) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = JSON.parse(localStorage.getItem('edu_users') || '[]');

        if (users.find(u => u.email === email)) {
            return { error: { message: "User already exists with this email" } };
        }

        const newUser = { id: Date.now().toString(), email, password };
        users.push(newUser);
        localStorage.setItem('edu_users', JSON.stringify(users));

        return { data: { user: newUser }, error: null };
    },

    async login(email, password) {
        await new Promise(resolve => setTimeout(resolve, 500));

        const users = JSON.parse(localStorage.getItem('edu_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { error: { message: "Invalid email or password" } };
        }

        localStorage.setItem('edu_session', JSON.stringify({ user, isLoggedIn: true }));
        // Dispatch an event so other tabs/components can listen
        window.dispatchEvent(new Event('authChange'));

        return { data: { session: { user } }, error: null };
    },

    async logout() {
        await new Promise(resolve => setTimeout(resolve, 300));
        localStorage.removeItem('edu_session');
        window.dispatchEvent(new Event('authChange'));
        return { error: null };
    },

    async getSession() {
        // Return immediately for checking
        const sessionStr = localStorage.getItem('edu_session');
        if (!sessionStr) {
            return { data: { session: null }, error: null };
        }

        try {
            const session = JSON.parse(sessionStr);
            return { data: { session }, error: null };
        } catch {
            return { data: { session: null }, error: null };
        }
    },

    onAuthStateChange(callback) {
        // Provide a simple event listener mimic
        const handleAuthChange = () => {
            this.getSession().then(({ data: { session } }) => {
                callback('SIGNED_CHANGE', session);
            });
        };

        window.addEventListener('authChange', handleAuthChange);
        // Also listen to cross-tab changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'edu_session') {
                handleAuthChange();
            }
        });

        return {
            data: {
                subscription: {
                    unsubscribe: () => {
                        window.removeEventListener('authChange', handleAuthChange);
                        // In a real app we'd keep track of specific listener to remove for storage event
                    }
                }
            }
        };
    }
};
