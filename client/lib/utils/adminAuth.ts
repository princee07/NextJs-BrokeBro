// Simple utility function to check if an email is an admin
export function isAdminEmail(email: string): boolean {
    const ADMIN_EMAILS = [
        'prince1362005@gmail.com',
        // Add more admin emails here if needed
    ];

    return ADMIN_EMAILS.includes(email);
}

// Export the admin emails list for use in other components
export const ADMIN_EMAILS = [
    'prince1362005@gmail.com',
    // Add more admin emails here if needed
];
