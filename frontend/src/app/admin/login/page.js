'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.login(username, password);
            router.push('/admin');
        } catch (err) {
            setError(err.message || 'Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan
                        flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                        P
                    </div>
                    <h1 className="text-2xl font-heading font-bold">Admin Panel</h1>
                    <p className="text-white/50 text-sm mt-2">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-white/50 text-sm mb-2">Username</label>
                        <input type="text" required value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field" placeholder="admin" />
                    </div>
                    <div>
                        <label className="block text-white/50 text-sm mb-2">Password</label>
                        <input type="password" required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field" placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={loading}
                        className="btn-primary w-full justify-center disabled:opacity-50">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
