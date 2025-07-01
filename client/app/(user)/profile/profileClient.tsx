"use client";

import QRCode from "react-qr-code";

export default function ProfileClient({ user }: { user: any }) {
  // Create a JSON object with all the user details
  const qrCodeData = JSON.stringify({
    source: "BrokeBro",
    userId: user?.id,
    name: `${user?.given_name || ''} ${user?.family_name || ''}`.trim(),
    email: user?.email,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Profile Info on the left */}
      <div className="lg:col-span-2 bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col items-start justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>
        <div className="mb-4">
          <span className="block text-gray-400 text-sm mb-1">Name</span>
          <span className="text-lg text-white font-semibold">{user?.given_name} {user?.family_name}</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-400 text-sm mb-1">Email</span>
          <span className="text-lg text-white font-semibold">{user?.email}</span>
        </div>
        {/* Add more fields as needed */}
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