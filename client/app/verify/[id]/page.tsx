import { notFound } from 'next/navigation';

interface VerifyPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock database check - replace with your actual database logic
async function checkVerificationStatus(userId: string) {
  try {
    // Call your verification API instead of mock data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/verify/${userId}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch verification status');
    }
    
    const data = await response.json();
    return data.isVerified;
  } catch (error) {
    console.error('Verification check failed:', error);
    return false;
  }
}

async function getUserDetails(userId: string) {
  try {
    // Call your verification API to get user details
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/verify/${userId}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    
    const data = await response.json();
    
    if (data.isVerified && data.user) {
      return {
        name: data.user.name,
        studentId: data.user.studentId,
        email: data.user.email,
        university: data.user.university,
        state: data.user.state,
        verificationDate: new Date(data.user.verificationDate).toLocaleDateString(),
        verificationId: data.user.verificationId
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    return null;
  }
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    notFound();
  }

  // Backend receives ID and checks database
  const isVerified = await checkVerificationStatus(id);
  const userDetails = await getUserDetails(id);

  if (isVerified && userDetails) {
    // Show Verified Page: ✅ Verified by BrokeBro
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">✅ Verified by BrokeBro</h1>
            <p className="text-green-100 mt-2">Student verification successful</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <img src="/assets/internpage/brokebro.png" alt="BrokeBro Logo" className="w-32 mx-auto mb-4" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Student Name:</span>
                <span className="text-gray-900 font-semibold">{userDetails.name}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Student ID:</span>
                <span className="text-gray-900 font-mono font-semibold">{userDetails.studentId}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-900 font-semibold text-sm">{userDetails.email}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">University:</span>
                <span className="text-gray-900 font-semibold text-sm">{userDetails.university}</span>
              </div>

              {userDetails.state && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">State:</span>
                  <span className="text-gray-900 font-semibold">{userDetails.state}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Verified Date:</span>
                <span className="text-gray-900 font-semibold">{userDetails.verificationDate}</span>
              </div>

              {userDetails.verificationId && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Verification ID:</span>
                  <span className="text-gray-900 font-mono text-xs">{userDetails.verificationId}</span>
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-semibold">Student Status: Verified</p>
                  <p className="text-green-600 text-sm">This student is eligible for discounts and offers</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-500 text-xs">
                Verified by BrokeBro • Scan timestamp: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Show Error Page: ❌ Not Verified by BrokeBro
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">❌ Not Verified by BrokeBro</h1>
            <p className="text-red-100 mt-2">Student verification failed</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="text-center mb-6">
              <img src="/assets/internpage/brokebro.png" alt="BrokeBro Logo" className="w-32 mx-auto mb-4 opacity-50" />
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </div>
                <div>
                  <p className="text-red-800 font-semibold">Verification Failed</p>
                  <p className="text-red-600 text-sm">This student ID is not in our verified database</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <h3 className="text-gray-900 font-semibold">Possible reasons:</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  Student has not completed verification process
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  Invalid or expired verification code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  Student account has been suspended
                </li>
              </ul>
            </div>

            <div className="border-t pt-4 mt-6">
              <h3 className="text-gray-900 font-semibold mb-2">Next steps:</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ask the student to complete their verification process or contact BrokeBro support.
              </p>
              
              <a 
                href="https://brokebro.com/student-verification" 
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
              >
                Start Verification Process
              </a>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-500 text-xs">
                BrokeBro Verification System • Scan timestamp: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
