import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { useRouter } from 'next/navigation';

// Add a context to share verification status
export const useVerificationStatus = () => {
    const [isVerified, setIsVerified] = useState(false);
    return { isVerified, setIsVerified };
};

export default function VerificationModal({ isOpen, onClose, setIsVerifiedGlobal }: { isOpen: boolean, onClose: () => void, setIsVerifiedGlobal?: (v: boolean) => void }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<any>(null);
    const [verifying, setVerifying] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
    };

    const handleVerify = async () => {
        if (!selectedFile) return;
        setVerifying(true);
        setVerificationResult(null);
        const formData = new FormData();
        formData.append('image', selectedFile);
        try {
            const res = await fetch('/api/verification', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setVerificationResult(data);
        } catch (err) {
            setVerificationResult({ error: 'Failed to verify. Try again.' });
        } finally {
            setVerifying(false);
        }
    };

    useEffect(() => {
        if (verificationResult && verificationResult.success && verificationResult.confidence_score > 40) {
            if (setIsVerifiedGlobal) setIsVerifiedGlobal(true);
            // No redirect, just show the message and let user close modal
        }
    }, [verificationResult]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-extrabold mb-2 text-green-400">Get Verified</h2>
                <div className="w-full flex flex-col items-center bg-green-900/10 border-2 border-dashed border-green-400 rounded-xl p-6 mb-2">
                    <input type="file" accept="image/*" className="mb-2" onChange={handleFileChange} />
                    {previewUrl && (
                        <img src={previewUrl} alt="ID Preview" className="max-h-40 rounded shadow mb-2 border-2 border-green-400" />
                    )}
                </div>
                <div className="flex gap-4 w-full justify-center">
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded font-semibold shadow transition-all duration-200 flex-1" type="button" disabled={!selectedFile || verifying} onClick={handleVerify}>
                        {verifying ? 'Verifying...' : 'Verify Student ID'}
                    </button>
                    <button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-2 rounded font-semibold shadow transition-all duration-200 flex-1" type="button" onClick={() => { setSelectedFile(null); setPreviewUrl(null); setVerificationResult(null); }}>
                        Clear
                    </button>
                </div>
                {verificationResult && (
                    <>
                        <div className="w-full bg-gray-900 rounded p-3 mt-2 text-left text-sm max-w-md border border-green-500/30">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-green-400 font-semibold text-base">Verification Result</span>
                                {verificationResult.success && verificationResult.confidence_score > 40 ? (
                                    <span className="bg-green-700 text-white px-2 py-0.5 rounded text-xs ml-2 flex items-center gap-1">Verified <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' /></svg></span>
                                ) : (
                                    <span className="bg-red-700 text-white px-2 py-0.5 rounded text-xs ml-2">Not Verified</span>
                                )}
                                <span className="ml-auto bg-blue-800 text-blue-200 px-2 py-0.5 rounded text-xs">Confidence: {verificationResult.confidence_score || 0}%</span>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-x-4 gap-y-1 text-gray-200">
                                <div className="font-semibold flex items-center">Name:
                                    {verificationResult.success && verificationResult.confidence_score > 40 && (
                                        <svg className="w-4 h-4 ml-1 text-green-500" viewBox="0 0 24 24" fill="currentColor"><g><path fill="#fff" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" /><path fill="#25D366" d="M12 22.8c5.965 0 10.8-4.835 10.8-10.8S17.965 1.2 12 1.2 1.2 6.035 1.2 12 6.035 22.8 12 22.8z" /><path fill="#fff" d="M17.472 8.309a.9.9 0 0 0-1.272-.036l-5.184 4.8-2.184-2.184a.9.9 0 1 0-1.272 1.272l2.8 2.8a.9.9 0 0 0 1.248.024l5.8-5.4a.9.9 0 0 0-.036-1.276z" /></g></svg>
                                    )}
                                </div>
                                <div>{verificationResult.student_info?.name || '-'}</div>
                                <div className="font-semibold">Institution:</div>
                                <div>{verificationResult.student_info?.institution || '-'}</div>
                                <div className="font-semibold">Course:</div>
                                <div>{verificationResult.student_info?.course || '-'}</div>
                                <div className="font-semibold">Student ID:</div>
                                <div>{verificationResult.student_info?.student_id || '-'}</div>
                                <div className="font-semibold">Expiry Date:</div>
                                <div>{verificationResult.student_info?.expiry_date || '-'}</div>
                            </div>
                        </div>
                        {/* If verified, show message and redirect after 2s */}
                        {verificationResult.success && verificationResult.confidence_score > 40 && (
                            <div className="text-green-400 font-bold text-lg mt-4 flex items-center gap-2">You are verified now! <svg className='w-6 h-6 text-green-400' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' /></svg></div>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
}
