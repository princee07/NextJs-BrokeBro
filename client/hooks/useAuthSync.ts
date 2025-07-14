import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';

// Update this function to match your actual login token key and validation logic
function getIsLoggedIn() {
    // Use 'adminAuthenticated' key for login detection
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    return adminAuthenticated === 'true';
}

export function useAuthSync() {
    const setLoggedIn = useUserStore((state) => state.setLoggedIn);

    useEffect(() => {
        // Initial sync
        setLoggedIn(getIsLoggedIn());

        // Listen for storage changes (login/logout in other tabs)
        function handleStorage() {
            setLoggedIn(getIsLoggedIn());
        }
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [setLoggedIn]);
}
