"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomLoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            // Call your backend or Kinde login endpoint
            // For demo, just simulate success
            // Replace with your real login logic (Kinde, JWT, etc.)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 1200);
        } catch (err: any) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 animate-bgFade">
            <div className="bg-black/80 rounded-xl shadow-2xl p-8 w-full max-w-md border border-orange-500/30 relative">
                <h2 className="text-3xl font-bold text-orange-400 mb-2 text-center animate-fadeIn">Welcome Back!</h2>
                <p className="text-gray-300 mb-6 text-center animate-fadeIn delay-100">Login to your BrokeBro account</p>
                <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn delay-200">
                    <div>
                        <label className="block text-orange-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-orange-500/30 focus:border-orange-400 focus:outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-orange-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-orange-500/30 focus:border-orange-400 focus:outline-none transition"
                        />
                    </div>
                    {error && <div className="text-red-400 text-sm animate-fadeIn delay-300">{error}</div>}
                    {success && <div className="text-green-400 text-sm animate-fadeIn delay-300">Login successful! Redirecting...</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-lg shadow-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 animate-bounce"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 animate-fadeIn">
                    <img src="/assets/images/brokebro.png" alt="BrokeBro Mascot" className="h-16 w-16 rounded-full border-4 border-orange-400 shadow-lg bg-black" />
                </div>
            </div>
            <style jsx>{`
        .animate-bgFade {
          animation: bgFade 6s ease-in-out infinite alternate;
        }
        @keyframes bgFade {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
