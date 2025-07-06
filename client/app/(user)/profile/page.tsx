import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from 'next/image';
import ProfileClient from './profileClient';
import ProfileVerificationBadge from '@/components/ui/ProfileVerificationBadge';

export default async function ProfilePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-white">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-40 md:pt-44 pb-16 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-orange-500/80 via-pink-600/80 to-purple-700/80 rounded-3xl shadow-2xl p-8 mb-10 overflow-hidden group transition-transform duration-300 hover:scale-[1.02]">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-2xl z-0 animate-pulse" />
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 z-10 relative">
            <div className="flex-shrink-0 relative">
              {user?.picture ? (
                <Image
                  src={user.picture}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-lg shadow-orange-500/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-lg">
                  {user?.given_name?.charAt(0) || 'U'}
                </div>
              )}

              {/* Verification Badge Overlay - This will only show if user is verified */}
              <ProfileVerificationBadge size="lg" variant="overlay" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-1 flex items-center justify-center md:justify-start gap-2">
                {user?.given_name} {user?.family_name}
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse ml-2" title="Online" />
              </h2>
              <p className="text-lg text-gray-200 font-medium mb-2">{user?.email}</p>
              <span className="inline-block bg-black/30 text-xs text-white px-3 py-1 rounded-full font-semibold tracking-wide shadow">Premium Member</span>
            </div>
          </div>
        </div>
        <ProfileClient user={user} />
      </div>
    </div>
  );
}
