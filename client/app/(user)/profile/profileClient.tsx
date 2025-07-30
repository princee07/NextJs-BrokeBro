"use client";
import "@/styles/fix-oklch.css";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import ReferralSection from "@/components/ReferralSection";
import ProfileVerificationBadge from '@/components/ui/ProfileVerificationBadge';
import { useStudentVerification } from '@/hooks/useStudentVerification';
import QRCode from 'react-qr-code';

export default function ProfileClient({ user }: { user: any }) {
  const idCardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Download ID Card as image
  const handleDownloadIdCard = async () => {
    if (!idCardRef.current) return alert("ID Card not found. Please make sure it is visible.");
    setDownloading(true);
    try {
      // Wait a tick to ensure rendering
      await new Promise(res => setTimeout(res, 100));
      const canvas = await html2canvas(idCardRef.current, { backgroundColor: "#fff", useCORS: true, logging: true });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `BrokeBro_ID_Card_${user?.given_name || "user"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("ID Card downloaded successfully!");
    } catch (err) {
      alert("Failed to download ID Card. Please try again or check the console for errors.");
      console.error("ID Card download error:", err);
    } finally {
      setDownloading(false);
    }
  };
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Get verification status
  const { isVerified } = useStudentVerification();

  // Generate a unique verification URL with the user's ID for QR code
  const generateUniqueVerificationURL = () => {
    const uniqueID = user?.id || 'demo-user-id';
    return `${window.location.origin}/verify/${uniqueID}`;
  };

  // Get the verification URL for QR code
  const verificationURL = typeof window !== 'undefined' ? generateUniqueVerificationURL() : '';

  // Generate a unique profile link for the user (legacy - kept for compatibility)
  const userProfileLink = (() => {
    const name = `${user?.given_name || ''} ${user?.family_name || ''}`.trim() || 'Student';
    const studentId = user?.id?.slice(-9) || '123456789';
    const encodedName = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Create unique profile URL with name, ID, and date
    return `https://brokebro.com/profile/${encodedName}-${studentId}-${currentDate}`;
  })();

  // Handle resume upload
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', user?.id);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);

      // Create a local URL for preview
      const url = URL.createObjectURL(file);
      setUploadedResume(file);
      setResumeUrl(url);

      alert('Resume uploaded successfully!');

    } catch (error) {
      console.error('Resume upload failed:', error);
      alert(`Failed to upload resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle resume removal
  const handleRemoveResume = async () => {
    if (!uploadedResume) return;

    try {
      // TODO: Implement actual deletion API call
      // const response = await fetch(`/api/upload-resume?filename=${uploadedResume.name}`, {
      //   method: 'DELETE',
      // });

      setUploadedResume(null);
      setResumeUrl(null);
      alert('Resume removed successfully!');

    } catch (error) {
      console.error('Resume removal failed:', error);
      alert('Failed to remove resume. Please try again.');
    }
  };

  // Generate verification code for manual entry
  const generateVerificationCode = () => {
    const studentId = user?.id?.slice(-9) || '123456789';
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    
    // Super simple: Just date + last 3 digits of student ID
    const simpleCode = date.slice(-4) + studentId.slice(-3); // MMDD + 3 digits = 7 digits total
    
    return simpleCode;
  };

  const verificationCode = generateVerificationCode();

  // Handle verification code copy
  const handleCopyVerificationCode = () => {
    const codeInfo = `BrokeBro Student Verification
Name: ${user?.given_name} ${user?.family_name}
Code: ${verificationCode}
Status: ${isVerified ? 'VERIFIED' : 'PENDING'}
Valid: ${new Date().toLocaleDateString()}`;

    navigator.clipboard.writeText(codeInfo).then(() => {
      alert(`Verification details copied to clipboard:\n\n${codeInfo}`);
    }).catch(() => {
      alert(`Verification Code: ${verificationCode}\n\nManually copy this code for verification.`);
    });
    console.log('Verification Code:', verificationCode);
  };

  // Handle QR code link copy
  const handleCopyQRLink = () => {
    if (verificationURL) {
      navigator.clipboard.writeText(verificationURL).then(() => {
        alert(`QR Code link copied to clipboard:\n\n${verificationURL}`);
      }).catch(() => {
        alert(`QR Code Link: ${verificationURL}\n\nManually copy this link.`);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Resume Section - Full width */}
      <div className="bg-gray-900/90 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume Management
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload/Display Section */}
          <div>
            {!uploadedResume ? (
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-orange-500 transition-colors h-48 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <p className="text-white font-semibold mb-2">Upload your resume</p>
                    <p className="text-gray-400 text-sm mb-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                    <label className="inline-block">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      <span className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
                        {uploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Uploading...
                          </>
                        ) : (
                          'Choose File'
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-6 h-48 flex flex-col justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{uploadedResume.name}</p>
                    <p className="text-gray-400 text-sm">{(uploadedResume.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-gray-500 text-xs mt-1">Uploaded successfully</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  {resumeUrl && (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 text-center"
                    >
                      View Resume
                    </a>
                  )}
                  <button
                    onClick={handleRemoveResume}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Resume Actions</h3>

            <a
              href="/resume-builder/generate"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Resume
            </a>

            {uploadedResume && (
              <label className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Update Resume
              </label>
            )}

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Resume Tips</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Keep it under 2 pages</li>
                <li>• Use action verbs</li>
                <li>• Quantify achievements</li>
                <li>• Tailor for each job</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Refer & Earn Section */}
      <ReferralSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info - takes more space */}
        <div className="lg:col-span-2 bg-gray-900/90 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="block text-gray-400 text-sm mb-1">Full Name</span>
                <span className="text-lg text-white font-semibold">{user?.given_name} {user?.family_name}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-sm mb-1">Email Address</span>
                <span className="text-lg text-white font-semibold">{user?.email}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-sm mb-1">User ID</span>
                <span className="text-sm text-gray-300 font-mono">{user?.id}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="block text-gray-400 text-sm mb-1">Account Status</span>
                <span className="inline-flex items-center gap-2 text-green-400 font-semibold">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Active
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-sm mb-1">Member Since</span>
                <span className="text-white font-semibold">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-sm mb-1">Membership Type</span>
                <span className="inline-block bg-gradient-to-r from-orange-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Premium Member
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BrokeBro ID Card */}
        <div className="lg:col-span-1 bg-gray-900/90 rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Your BrokeBro ID Card</h3>

          {/* ID Card - Exact replica */}
          <div id="id-card" ref={idCardRef} className="relative bg-orange-500 rounded-2xl p-0 border-2 border-white shadow-2xl mx-auto max-w-sm aspect-[3/5] flex flex-col items-center justify-between">
            {/* BrokeBro Logo Image */}
            <img src="/assets/internpage/brokebro.png" alt="BrokeBro Logo" className="w-48 mx-auto mt-6 mb-2" style={{ objectFit: 'contain' }} />
            {/* User Name */}
            <div className="text-center w-full px-4 mt-4">
              <div className="text-white font-bold text-lg leading-tight break-words">
                {`${user?.given_name || ''} ${user?.family_name || ''}`.trim() || 'Full Name'}
              </div>
            </div>
            {/* Student ID */}
            <div className="text-center w-full px-4 mt-4">
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-1">STUDENT ID</div>
              <div className="text-white font-bold text-base">
                {user?.id?.slice(-9) || '123456789'}
              </div>
            </div>
            {/* Verification Code Display */}
            <div className="text-center w-full px-4 mt-3">
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-1">VERIFICATION CODE</div>
              <div className="text-white font-bold text-lg tracking-wider">
                {verificationCode}
              </div>
              <div className="text-white text-xs opacity-80 mt-1">
                Valid: {new Date().toLocaleDateString()}
              </div>
            </div>
            {/* Digital Badge Section with QR Code */}
            <div className="flex-1 flex flex-col justify-center items-center w-full mt-4 mb-4">
              <div className="flex justify-center items-center">
                <div className="bg-white flex flex-col justify-center items-center border-2 border-orange-700 rounded-lg p-4 text-center" style={{ width: 140, height: 140 }}>
                  <div className="text-orange-600 font-bold text-xs mb-2">QR VERIFICATION</div>
                  {verificationURL ? (
                    <div className="flex flex-col items-center">
                      <QRCode
                        value={verificationURL}
                        size={80}
                        style={{ height: "auto", maxWidth: "80px", width: "80px" }}
                        viewBox="0 0 256 256"
                      />
                      <div className="text-xs text-gray-600 mt-1">Scan to Verify</div>
                    </div>
                  ) : (
                    <div className="text-gray-600 text-center">
                      <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM12 12h1.5v1.5H12zM12 15h1.5v1.5H12zM15 12h1.5v1.5H15zM18 12h1.5v1.5H18zM12 18h1.5v1.5H12zM15 15h1.5v1.5H15zM18 15h1.5v1.5H18zM15 18h1.5v1.5H15zM18 18h1.5v1.5H18z"/>
                      </svg>
                      <div className="text-xs font-bold">QR CODE</div>
                      <div className="text-xs">Loading...</div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white text-xs text-center mt-2 px-2">
                Scan QR code for instant verification
              </p>
            </div>
            {/* Bottom Banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-black text-center py-3 font-black text-sm tracking-[0.2em] uppercase">
              STUDENT DISCOUNT
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 space-y-3">
          <div className="flex gap-3 justify-center">
            <button
              className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm flex items-center gap-2 cursor-pointer ${downloading ? 'opacity-60 pointer-events-none' : ''}`}
              onClick={handleDownloadIdCard}
              disabled={downloading}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {downloading ? 'Downloading...' : 'Download ID'}
            </button>
            
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
              onClick={handleCopyVerificationCode}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2l-4.257-2.257A6 6 0 0117 9a2 2 0 012 2z" />
              </svg>
              Get Code
            </button>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
              onClick={handleCopyQRLink}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              QR Link
            </button>
          </div>
          
          <p className="text-gray-400 text-xs text-center max-w-sm mx-auto">
            QR Code: Instant verification • 7-digit code: Manual backup • Link: Share verification
          </p>
          
          {/* QR Code Verification Flow Guide */}
          <div className="bg-gray-800 rounded-lg p-4 mt-4">
            <h4 className="text-white font-medium mb-3 text-sm">🔄 QR Code Verification Flow</h4>
            <div className="text-gray-400 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">1</span>
                <span><strong>Generate Unique QR Code:</strong> Points to /verify/{user?.id?.slice(-9) || 'ID'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">2</span>
                <span><strong>User Scans QR Code:</strong> Opens verification URL</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
                <span><strong>Redirect to BrokeBro Page:</strong> /verify/{user?.id?.slice(-9) || 'ID'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">4</span>
                <span><strong>Backend Checks Database:</strong> Is ID verified?</span>
              </div>
              
              <div className="bg-gray-700 p-2 rounded ml-6 mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-400">✅</span>
                  <span className="text-green-400"><strong>YES:</strong> Show "Verified by BrokeBro" page</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span className="text-red-400"><strong>NO:</strong> Show "Not Verified" error page</span>
                </div>
              </div>
              
              <div className="text-yellow-400 mt-3 text-center">
                <strong>Try it:</strong> {verificationURL ? (
                  <a href={verificationURL} target="_blank" rel="noopener noreferrer" className="underline">
                    Test verification page
                  </a>
                ) : 'Loading verification URL...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}