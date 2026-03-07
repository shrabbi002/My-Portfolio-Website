'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function CertificationsPage() {
    const [certs, setCerts] = useState(() => api.getCached('/certifications') || []);
    const [activeType, setActiveType] = useState('All');
    const [loading, setLoading] = useState(() => !api.getCached('/certifications'));

    useEffect(() => {
        api.get('/certifications').then(setCerts).catch(console.error).finally(() => setLoading(false));
    }, []);

    const types = ['All', 'certification', 'award', 'competition'];
    const filtered = activeType === 'All' ? certs : certs.filter(c => c.type === activeType);

    if (loading && certs.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-24 section-padding">
            <div className="section-container">
                <div className="text-center mb-16 animate-fadeInUp">
                    <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Credentials</p>
                    <h1 className="section-title">Certifications & Achievements</h1>
                    <p className="section-subtitle mx-auto">Professional credentials and recognition</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {types.map((type) => (
                        <button key={type} onClick={() => setActiveType(type)}
                            className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${activeType === type
                                    ? 'bg-primary-500 text-white shadow-glow'
                                    : 'bg-dark-800/50 text-white/50 hover:text-white hover:bg-dark-700/50'
                                }`}>
                            {type}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((cert, i) => (
                        <div key={cert._id || i} className="glass-card-hover p-6 group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${cert.type === 'certification' ? 'bg-primary-500/20' :
                                        cert.type === 'award' ? 'bg-yellow-500/20' :
                                            'bg-accent-cyan/20'
                                    }`}>
                                    {cert.type === 'certification' ? '🎓' : cert.type === 'award' ? '🏆' : '🥇'}
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold group-hover:text-primary-400 transition-colors">{cert.title}</h3>
                                    <p className="text-white/50 text-sm">{cert.organization}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                {cert.year && <span className="text-white/40 text-sm">{cert.year}</span>}
                                {(cert.certificateUrl || cert.certificateImage) && (
                                    <a href={cert.certificateUrl || api.getFileUrl(cert.certificateImage)}
                                        target="_blank" rel="noopener noreferrer"
                                        className="text-primary-400 text-sm hover:underline">
                                        View Certificate ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && !loading && (
                    <div className="text-center py-20 text-white/40">
                        <span className="text-5xl block mb-4">🎓</span>
                        <p>No certifications found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
