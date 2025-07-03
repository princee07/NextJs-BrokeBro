"use client";

import { useState, useEffect } from "react";
import { getUserReferralData } from "@/app/lib/actions/referral.actions";

interface ReferralData {
    referralCode: string;
    coins: number;
    referralUrl: string;
    totalReferrals: number;
    referralsList: Array<{
        name: string;
        email: string;
        joinedAt: Date;
        coinsEarned: number;
    }>;
}

export default function ReferralSection() {
    const [referralData, setReferralData] = useState<ReferralData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const fetchReferralData = async () => {
        try {
            setLoading(true);
            const result = await getUserReferralData();
            console.log('ReferralSection data result:', result);
            if (result.success && result.data) {
                setReferralData(result.data);
                console.log('ReferralSection - Referral URL:', result.data.referralUrl);
                console.log('ReferralSection - Referral Code:', result.data.referralCode);
                console.log('ReferralSection - Coins:', result.data.coins);
                console.log('ReferralSection - Total Referrals:', result.data.totalReferrals);
            } else {
                console.error('Failed to get referral data:', result);
            }
        } catch (error) {
            console.error("Failed to fetch referral data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReferralData();
    }, []);

    // Listen for referral events to refresh data
    useEffect(() => {
        const handleReferralProcessed = () => {
            console.log('ReferralSection: Referral processed event received, refreshing data...');
            fetchReferralData();
        };

        // Listen for custom event
        window.addEventListener('referralProcessed', handleReferralProcessed);

        // Also refresh data when window gains focus
        window.addEventListener('focus', fetchReferralData);

        return () => {
            window.removeEventListener('referralProcessed', handleReferralProcessed);
            window.removeEventListener('focus', fetchReferralData);
        };
    }, []);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('ReferralSection: Auto-refreshing referral data...');
            fetchReferralData();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, []);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const shareToWhatsApp = () => {
        if (!referralData) return;
        const message = `🎉 Join BrokeBro with my referral link and we both get 10 coins! 💰\n\n${referralData.referralUrl}\n\nGet amazing student discounts and deals! 🎓`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareToTelegram = () => {
        if (!referralData) return;
        const message = `🎉 Join BrokeBro with my referral link and we both get 10 coins! 💰\n\n${referralData.referralUrl}\n\nGet amazing student discounts and deals! 🎓`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralData.referralUrl)}&text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="bg-gray-900/90 rounded-2xl shadow-xl p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!referralData) {
        return (
            <div className="bg-gray-900/90 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Refer & Earn</h2>
                <p className="text-gray-400">Failed to load referral data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900/90 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Refer & Earn
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Referral Stats & Actions */}
                <div className="space-y-6">
                    {/* Coins Display */}
                    <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl p-6 text-center">
                        <div className="text-white text-3xl font-bold mb-2">{referralData.coins}</div>
                        <div className="text-orange-100 text-sm font-medium">Total Coins Earned</div>
                    </div>

                    {/* Referral Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-white text-2xl font-bold mb-1">{referralData.totalReferrals}</div>
                            <div className="text-gray-400 text-sm">Friends Referred</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-white text-2xl font-bold mb-1">{referralData.totalReferrals * 10}</div>
                            <div className="text-gray-400 text-sm">Coins from Referrals</div>
                        </div>
                    </div>

                    {/* Referral Code */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <div className="text-gray-400 text-sm mb-2">Your Referral Code</div>
                        <div className="flex items-center gap-3">
                            <code className="bg-gray-700 text-orange-400 px-3 py-2 rounded font-mono text-lg flex-1">
                                {referralData.referralCode}
                            </code>
                            <button
                                onClick={() => copyToClipboard(referralData.referralCode)}
                                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition-colors"
                                title="Copy Code"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Referral URL */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <div className="text-gray-400 text-sm mb-2">Your Referral Link</div>
                        <div className="space-y-3">
                            {/* URL Display Box */}
                            <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                                <div className="text-white text-sm break-all font-mono leading-relaxed">
                                    {referralData.referralUrl}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => copyToClipboard(referralData.referralUrl)}
                                    className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </button>

                                <button
                                    onClick={() => {
                                        // Select all text in a temporary textarea for easy copying
                                        const textArea = document.createElement('textarea');
                                        textArea.value = referralData.referralUrl;
                                        document.body.appendChild(textArea);
                                        textArea.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(textArea);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                                    title="Select All & Copy"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Select All
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-3">
                        <div className="text-gray-400 text-sm">Share with Friends</div>
                        <div className="flex gap-3">
                            <button
                                onClick={shareToWhatsApp}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                WhatsApp
                            </button>
                            <button
                                onClick={shareToTelegram}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                                Telegram
                            </button>
                        </div>
                    </div>
                </div>

                {/* Referral List */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Your Referrals ({referralData.totalReferrals})</h3>

                    {referralData.referralsList.length === 0 ? (
                        <div className="bg-gray-800 rounded-xl p-6 text-center">
                            <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <p className="text-gray-400">No referrals yet</p>
                            <p className="text-gray-500 text-sm mt-1">Share your link to start earning!</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {referralData.referralsList.map((referral, index) => (
                                <div key={index} className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="text-white font-medium">{referral.name}</div>
                                        <div className="text-gray-400 text-sm">{referral.email}</div>
                                        <div className="text-gray-500 text-xs">
                                            Joined {new Date(referral.joinedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-orange-400 font-semibold">+{referral.coinsEarned} coins</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* How it works */}
            <div className="mt-8 bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">1</span>
                        </div>
                        <h4 className="text-white font-medium mb-2">Share Your Link</h4>
                        <p className="text-gray-400 text-sm">Copy and share your unique referral link with friends</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">2</span>
                        </div>
                        <h4 className="text-white font-medium mb-2">Friend Signs Up</h4>
                        <p className="text-gray-400 text-sm">Your friend registers using your referral link</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">3</span>
                        </div>
                        <h4 className="text-white font-medium mb-2">Both Get Coins</h4>
                        <p className="text-gray-400 text-sm">You and your friend both receive 10 coins instantly!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
