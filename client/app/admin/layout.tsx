import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthProvider from '@/components/admin/AdminAuthProvider';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminAuthProvider>
            <AdminLayout>{children}</AdminLayout>
        </AdminAuthProvider>
    );
}
