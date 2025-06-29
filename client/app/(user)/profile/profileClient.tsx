"use client";
import ProfileForm from '@/components/forms/ProfileForm';
import QRCode from "react-qr-code";

export default function ProfileClient({ user }: { user: any }) {
  // This function will be called when the form is submitted
  const handleUpdate = async (formData: FormData) => {
    // TODO: Implement update logic (e.g., call an API to update user profile)
    console.log('Profile update:', Object.fromEntries(formData.entries()));
    // You can show a toast or feedback here if you want
  };

  // Create a JSON object with all the user details
  const qrCodeData = JSON.stringify({
    source: "BrokeBro",
    userId: user?.id,
    name: `${user?.given_name || ''} ${user?.family_name || ''}`.trim(),
    email: user?.email,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Profile Form on the left */}
      <div className="lg:col-span-2 bg-gray-900/90 rounded-2xl shadow-xl p-8">
        <ProfileForm user={user} onUpdate={handleUpdate} />
      </div>

      {/* QR Code on the right */}
      <div className="bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-white mb-4">Your BrokeBro ID</h3>
        <div style={{ background: 'white', padding: '16px' }}>
          <QRCode value={qrCodeData} size={160} />
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">Scan to see your full BrokeBro profile details.</p>
      </div>
    </div>
  );
}