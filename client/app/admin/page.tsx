"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Calendar,
    Activity,
    AlertCircle,
    Eye,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
    totalVerifications: number;
    pending: number;
    approved: number;
    rejected: number;
    todaySubmissions: number;
    weeklyGrowth: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalVerifications: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        todaySubmissions: 0,
        weeklyGrowth: 0
    });
    const [recentVerifications, setRecentVerifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch dashboard stats
            const response = await fetch('/api/admin/verifications');
            if (response.ok) {
                const data = await response.json();
                // Use real stats from the API
                const realStats = {
                    totalVerifications: data.stats?.total || 0,
                    pending: data.stats?.pending || 0,
                    approved: data.stats?.approved || 0,
                    rejected: data.stats?.rejected || 0,
                    todaySubmissions: data.verifications?.filter((v: any) => {
                        const today = new Date();
                        const submittedDate = new Date(v.submittedAt);
                        return submittedDate.toDateString() === today.toDateString();
                    }).length || 0,
                    weeklyGrowth: 0 // Calculate this based on actual data
                };
                setStats(realStats);
                setRecentVerifications(data.verifications?.slice(0, 5) || []);
            } else {
                // Empty state if API fails
                setStats({
                    totalVerifications: 0,
                    pending: 0,
                    approved: 0,
                    rejected: 0,
                    todaySubmissions: 0,
                    weeklyGrowth: 0
                });
                setRecentVerifications([]);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Empty state on error
            setStats({
                totalVerifications: 0,
                pending: 0,
                approved: 0,
                rejected: 0,
                todaySubmissions: 0,
                weeklyGrowth: 0
            });
            setRecentVerifications([]);
        } finally {
            setLoading(false);
        }
    };

    // Clear all verification data (for testing)
    const clearAllData = async () => {
        if (!confirm('Are you sure you want to clear all verification data? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch('/api/admin/clear-data', {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('All verification data cleared successfully!');
                fetchDashboardData(); // Refresh dashboard
            } else {
                alert('Failed to clear data');
            }
        } catch (error) {
            console.error('Error clearing data:', error);
            alert('Error clearing data');
        }
    };

    const statCards = [
        {
            title: 'Total Verifications',
            value: stats.totalVerifications,
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            change: `+${stats.weeklyGrowth}%`,
            changeType: 'increase'
        },
        {
            title: 'Pending Reviews',
            value: stats.pending,
            icon: Clock,
            color: 'from-yellow-500 to-orange-500',
            change: 'Needs attention',
            changeType: 'neutral'
        },
        {
            title: 'Approved',
            value: stats.approved,
            icon: CheckCircle,
            color: 'from-green-500 to-emerald-500',
            change: `${((stats.approved / stats.totalVerifications) * 100).toFixed(1)}%`,
            changeType: 'increase'
        },
        {
            title: 'Rejected',
            value: stats.rejected,
            icon: XCircle,
            color: 'from-red-500 to-pink-500',
            change: `${((stats.rejected / stats.totalVerifications) * 100).toFixed(1)}%`,
            changeType: 'neutral'
        }
    ];

    const quickActions = [
        {
            title: 'Review Pending',
            description: 'Review pending verification requests',
            href: '/admin/verification?status=pending',
            icon: Clock,
            color: 'from-yellow-500 to-orange-500',
            count: stats.pending
        },
        {
            title: 'View All Requests',
            description: 'Manage all verification requests',
            href: '/admin/verification',
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            count: stats.totalVerifications
        },
        {
            title: 'Analytics',
            description: 'View detailed analytics',
            href: '/admin/analytics',
            icon: BarChart3,
            color: 'from-purple-500 to-violet-500',
            count: null
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <span className="text-lg text-white">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage student verifications and monitor system activity</p>
                </div>

                {/* Development Controls */}
                <div className="flex gap-3">
                    <button
                        onClick={fetchDashboardData}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                    >
                        Refresh Data
                    </button>
                    <button
                        onClick={clearAllData}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                        Clear All Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-gray-900 rounded-xl p-6 border border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-400' :
                                stat.changeType === 'decrease' ? 'text-red-400' : 'text-gray-400'
                                }`}>
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                            >
                                <Link href={action.href}>
                                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                                                <action.icon className="w-5 h-5 text-white" />
                                            </div>
                                            {action.count !== null && (
                                                <span className="text-2xl font-bold text-white">{action.count}</span>
                                            )}
                                        </div>
                                        <h3 className="text-white font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{action.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Today's Activity */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Today's Activity</h3>
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400 text-sm font-medium">New Submissions</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stats.todaySubmissions}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Activity className="w-4 h-4 text-blue-400" />
                                    <span className="text-blue-400 text-sm font-medium">Reviews Completed</span>
                                </div>
                                <p className="text-2xl font-bold text-white">6</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400 text-sm font-medium">Pending Actions</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Recent Verifications</h3>
                        <Link href="/admin/verification" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Rahul Sharma', college: 'Delhi University', status: 'pending', time: '2 hours ago' },
                            { name: 'Priya Patel', college: 'IIT Bombay', status: 'approved', time: '4 hours ago' },
                            { name: 'Arjun Singh', college: 'MIT Manipal', status: 'under_review', time: '6 hours ago' },
                            { name: 'Sneha Gupta', college: 'Jadavpur University', status: 'rejected', time: '1 day ago' }
                        ].map((verification, index) => (
                            <motion.div
                                key={verification.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">{verification.name[0]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{verification.name}</p>
                                    <p className="text-gray-400 text-xs truncate">{verification.college}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${verification.status === 'pending' ? 'text-yellow-400 bg-yellow-500/20' :
                                        verification.status === 'approved' ? 'text-green-400 bg-green-500/20' :
                                            verification.status === 'under_review' ? 'text-blue-400 bg-blue-500/20' :
                                                'text-red-400 bg-red-500/20'
                                        }`}>
                                        {verification.status === 'pending' && <Clock className="w-3 h-3" />}
                                        {verification.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                                        {verification.status === 'under_review' && <Eye className="w-3 h-3" />}
                                        {verification.status === 'rejected' && <XCircle className="w-3 h-3" />}
                                        {verification.status.replace('_', ' ')}
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1">{verification.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
