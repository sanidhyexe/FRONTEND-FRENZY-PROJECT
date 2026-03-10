import React, { useState } from 'react';
import { MdSchool } from 'react-icons/md';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.');
            return;
        }

        const loginResult = onLogin({
            email: email.trim(),
            password,
        });

        if (!loginResult.success) {
            setError(loginResult.message);
            return;
        }

        setError('');
    };

    return (
        <div className="animated-bg min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-500 p-2.5 rounded-lg text-white">
                        <MdSchool className="text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">EduTrack Login</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to access your dashboard</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="alex@edutrack.com"
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                    </div>

                    {error && (
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 px-3 py-2.5">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Demo credentials: <span className="font-semibold text-slate-700 dark:text-slate-200">alex@edutrack.com / 123456</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
