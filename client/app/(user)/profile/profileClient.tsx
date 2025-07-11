"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import ReferralSection from "@/components/ReferralSection";
import ProfileVerificationBadge from '@/components/ui/ProfileVerificationBadge';
import { useStudentVerification } from '@/hooks/useStudentVerification';

export default function ProfileClient({ user }: { user: any }) {
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Get verification status
  const { isVerified } = useStudentVerification();

  // Create a JSON object with all the user details
  const qrCodeData = JSON.stringify({
    source: "BrokeBro",
    userId: user?.id,
    name: `${user?.given_name || ''} ${user?.family_name || ''}`.trim(),
    email: user?.email,
  });

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
          <div className="relative bg-black rounded-2xl p-0 border-2 border-orange-500 shadow-2xl mx-auto max-w-sm aspect-[3/5] overflow-hidden">
            {/* Inner orange border */}
            <div className="absolute inset-3 border-2 border-orange-500 rounded-xl"></div>

            {/* Card Content */}
            <div className="relative h-full flex flex-col p-6">
              {/* BrokeBro Logo at top */}
              <div className="text-center mb-8 mt-4">
                <div className="text-orange-500 font-black text-4xl tracking-tighter leading-none mb-2">
                  BROKE
                </div>
                <div className="flex items-center justify-center gap-0">
                  <span className="text-orange-500 font-black text-4xl tracking-tighter">BR</span>
                  <div className="flex gap-1 ml-1">
                    <div className="w-8 h-8 bg-white rounded-full relative overflow-hidden">
                      <div className="w-full h-4 bg-orange-500 absolute top-0"></div>
                      <div className="w-full h-4 bg-white absolute bottom-0"></div>
                      <div className="w-3.5 h-3.5 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div className="w-8 h-8 bg-white rounded-full relative overflow-hidden">
                      <div className="w-full h-4 bg-orange-500 absolute top-0"></div>
                      <div className="w-full h-4 bg-white absolute bottom-0"></div>
                      <div className="w-3.5 h-3.5 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="flex-1 space-y-6">
                {/* Name */}
                <div>
                  <div className="text-orange-500 text-sm font-bold uppercase tracking-wider mb-2">NAME</div>
                  <div className="text-white font-bold text-xl leading-tight">
                    {user?.given_name} {user?.family_name}
                  </div>
                </div>

                {/* University */}
                <div>
                  <div className="text-orange-500 text-sm font-bold uppercase tracking-wider mb-2">UNIVERSITY</div>
                  <div className="text-white font-semibold text-base leading-tight">
                    Indian Institute<br />of Technology
                  </div>
                </div>

                {/* Bottom section with Student ID and QR */}
                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <div className="text-orange-500 text-sm font-bold uppercase tracking-wider mb-2">STUDENT ID</div>
                    <div className="text-white font-bold text-lg">
                      {user?.id?.slice(-9) || '123456789'}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-3 rounded-md">

                    <QRCode value={qrCodeData} size={110} title="QR Code" />

                  </div>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-black text-center py-3 font-black text-sm tracking-[0.2em] uppercase">
                STUDENT DISCOUNT
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-6 text-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm flex items-center gap-2 mx-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download ID Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}