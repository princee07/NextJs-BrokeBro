"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    FileText,
    User,
    GraduationCap,
    MapPin,
    Calendar,
    AlertTriangle
} from 'lucide-react';
import { VerificationStatus } from '@/types/verification';

interface AdminVerificationPageProps { }

export default function AdminVerificationPage({ }: AdminVerificationPageProps) {
    const [verifications, setVerifications] = useState<VerificationStatus[]>([]);
    const [filteredVerifications, setFilteredVerifications] = useState<VerificationStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedVerification, setSelectedVerification] = useState<VerificationStatus | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch verification requests
    useEffect(() => {
        fetchVerifications();
    }, []);

    // Filter verifications based on search and status
    useEffect(() => {
        let filtered = verifications;

        if (searchTerm) {
            filtered = filtered.filter(
                (v) =>
                    v.studentData.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    v.studentData.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    v.studentData.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((v) => v.status === statusFilter);
        }

        setFilteredVerifications(filtered);
    }, [verifications, searchTerm, statusFilter]);

    const fetchVerifications = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/verifications');
            if (!response.ok) throw new Error('Failed to fetch verifications');

            const data = await response.json();
            setVerifications(data.verifications || []);
        } catch (error) {
            console.error('Error fetching verifications:', error);
            // Set empty array if fetch fails
            setVerifications([]);
        } finally {
            setLoading(false);
        }
    };

    const updateVerificationStatus = async (
        verificationId: string,
        status: 'approved' | 'rejected',
        adminNotes?: string
    ) => {
        try {
            const response = await fetch('/api/admin/verifications/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ verificationId, status, adminNotes }),
            });

            if (!response.ok) throw new Error('Failed to update status');

            // Update local state
            setVerifications((prev) =>
                prev.map((v) =>
                    v.id === verificationId
                        ? {
                            ...v,
                            status,
                            reviewedAt: new Date(),
                            adminNotes,
                        }
                        : v
                )
            );

            setShowModal(false);
            alert(`Verification ${status} successfully!`);
        } catch (error) {
            console.error('Error updating verification:', error);
            alert('Failed to update verification status');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
            case 'under_review':
                return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
            case 'approved':
                return 'text-green-400 bg-green-500/20 border-green-500/30';
            case 'rejected':
                return 'text-red-400 bg-red-500/20 border-red-500/30';
            default:
                return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'under_review':
                return <Eye className="w-4 h-4" />;
            case 'approved':
                return <CheckCircle className="w-4 h-4" />;
            case 'rejected':
                return <XCircle className="w-4 h-4" />;
            default:
                return <AlertTriangle className="w-4 h-4" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <span className="text-lg">Loading verifications...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Student Verification Admin</h1>
                            <p className="text-gray-400">Review and verify student submissions</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2">
                                <Users className="w-5 h-5 text-gray-400" />
                                <span className="text-white font-medium">{verifications.length} Total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        {
                            label: 'Pending',
                            count: verifications.filter((v) => v.status === 'pending').length,
                            color: 'from-yellow-500 to-orange-500',
                            icon: Clock,
                        },
                        {
                            label: 'Under Review',
                            count: verifications.filter((v) => v.status === 'under_review').length,
                            color: 'from-blue-500 to-cyan-500',
                            icon: Eye,
                        },
                        {
                            label: 'Approved',
                            count: verifications.filter((v) => v.status === 'approved').length,
                            color: 'from-green-500 to-emerald-500',
                            icon: CheckCircle,
                        },
                        {
                            label: 'Rejected',
                            count: verifications.filter((v) => v.status === 'rejected').length,
                            color: 'from-red-500 to-pink-500',
                            icon: XCircle,
                        },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold text-white">{stat.count}</p>
                                </div>
                                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, college, or roll number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Verification List */}
                <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="text-left py-4 px-6 text-gray-300 font-medium">Student</th>
                                    <th className="text-left py-4 px-6 text-gray-300 font-medium">College</th>
                                    <th className="text-left py-4 px-6 text-gray-300 font-medium">Roll No</th>
                                    <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                                    <th className="text-left py-4 px-6 text-gray-300 font-medium">Submitted</th>
                                    <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVerifications.map((verification) => (
                                    <tr key={verification.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{verification.studentData.studentName}</p>
                                                    <p className="text-gray-400 text-sm">{verification.studentData.state}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-white">{verification.studentData.collegeName}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-white font-mono">{verification.studentData.rollNo}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(verification.status)}`}>
                                                {getStatusIcon(verification.status)}
                                                {verification.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-gray-400 text-sm">
                                                {new Date(verification.submittedAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => {
                                                    setSelectedVerification(verification);
                                                    setShowModal(true);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredVerifications.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No verification requests found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Verification Modal */}
            {showModal && selectedVerification && (
                <VerificationModal
                    verification={selectedVerification}
                    onClose={() => setShowModal(false)}
                    onUpdateStatus={updateVerificationStatus}
                />
            )}
        </div>
    );
}

// Verification Modal Component
interface VerificationModalProps {
    verification: VerificationStatus;
    onClose: () => void;
    onUpdateStatus: (id: string, status: 'approved' | 'rejected', notes?: string) => void;
}

function VerificationModal({ verification, onClose, onUpdateStatus }: VerificationModalProps) {
    const [adminNotes, setAdminNotes] = useState(verification.adminNotes || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
        setIsSubmitting(true);
        await onUpdateStatus(verification.id, status, adminNotes);
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Verification Review</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Student Information */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Student Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <label className="text-gray-400 text-sm">Student Name</label>
                                        <p className="text-white font-medium">{verification.studentData.studentName}</p>
                                    </div>
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <label className="text-gray-400 text-sm">College Name</label>
                                        <p className="text-white font-medium">{verification.studentData.collegeName}</p>
                                    </div>
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <label className="text-gray-400 text-sm">Roll Number</label>
                                        <p className="text-white font-medium font-mono">{verification.studentData.rollNo}</p>
                                    </div>
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <label className="text-gray-400 text-sm">State</label>
                                        <p className="text-white font-medium">{verification.studentData.state}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Documents
                                </h3>
                                <div className="space-y-3">
                                    {verification.documents?.idCardUrl && (
                                        <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                                            <span className="text-white">Student ID Card</span>
                                            <button
                                                onClick={() => window.open(verification.documents?.idCardUrl, '_blank')}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                View
                                            </button>
                                        </div>
                                    )}
                                    {verification.documents?.feeReceiptUrl && (
                                        <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                                            <span className="text-white">Fee Receipt</span>
                                            <button
                                                onClick={() => window.open(verification.documents?.feeReceiptUrl, '_blank')}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                View
                                            </button>
                                        </div>
                                    )}
                                    {verification.documents?.studentEmail && (
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <label className="text-gray-400 text-sm">Student Email</label>
                                            <p className="text-white font-medium">{verification.documents.studentEmail}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Review Section */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    Review Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <label className="text-gray-400 text-sm">Submission Date</label>
                                        <p className="text-white font-medium">
                                            {new Date(verification.submittedAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-gray-800 rounded-lg p-4">
                                        <label className="text-gray-400 text-sm">Current Status</label>
                                        <div className="mt-2">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(verification.status)}`}>
                                                {getStatusIcon(verification.status)}
                                                {verification.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Notes */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Admin Notes</h3>
                                <textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Add notes about this verification..."
                                    className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            {/* Action Buttons */}
                            {verification.status !== 'approved' && verification.status !== 'rejected' && (
                                <div className="flex gap-4">
                                    <motion.button
                                        onClick={() => handleStatusUpdate('approved')}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        {isSubmitting ? 'Updating...' : 'Approve'}
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleStatusUpdate('rejected')}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        {isSubmitting ? 'Updating...' : 'Reject'}
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Helper function to get status colors and icons (moved outside component)
function getStatusColor(status: string) {
    switch (status) {
        case 'pending':
            return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
        case 'under_review':
            return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
        case 'approved':
            return 'text-green-400 bg-green-500/20 border-green-500/30';
        case 'rejected':
            return 'text-red-400 bg-red-500/20 border-red-500/30';
        default:
            return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
}

function getStatusIcon(status: string) {
    switch (status) {
        case 'pending':
            return <Clock className="w-4 h-4" />;
        case 'under_review':
            return <Eye className="w-4 h-4" />;
        case 'approved':
            return <CheckCircle className="w-4 h-4" />;
        case 'rejected':
            return <XCircle className="w-4 h-4" />;
        default:
            return <AlertTriangle className="w-4 h-4" />;
    }
}

// Mock data for demo purposes
function getMockVerifications(): VerificationStatus[] {
    return [
        {
            id: 'VER_001',
            userId: 'user_1',
            status: 'pending',
            submittedAt: new Date('2025-01-05'),
            studentData: {
                studentName: 'Rahul Sharma',
                collegeName: 'Delhi University',
                rollNo: 'DU2023001',
                state: 'Delhi'
            },
            documents: {
                idCardUrl: '/documents/id_001.jpg',
                feeReceiptUrl: '/documents/fee_001.pdf',
                studentEmail: 'rahul.sharma@du.ac.in'
            }
        },
        {
            id: 'VER_002',
            userId: 'user_2',
            status: 'under_review',
            submittedAt: new Date('2025-01-04'),
            studentData: {
                studentName: 'Priya Patel',
                collegeName: 'IIT Bombay',
                rollNo: 'IITB2022045',
                state: 'Maharashtra'
            },
            documents: {
                studentEmail: 'priya.patel@iitb.ac.in'
            }
        },
        {
            id: 'VER_003',
            userId: 'user_3',
            status: 'approved',
            submittedAt: new Date('2025-01-03'),
            reviewedAt: new Date('2025-01-04'),
            adminNotes: 'All documents verified successfully',
            studentData: {
                studentName: 'Arjun Singh',
                collegeName: 'Manipal Institute of Technology',
                rollNo: 'MIT2021089',
                state: 'Karnataka'
            },
            documents: {
                idCardUrl: '/documents/id_003.jpg',
                feeReceiptUrl: '/documents/fee_003.pdf'
            }
        }
    ];
}
