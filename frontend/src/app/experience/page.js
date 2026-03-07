'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState(() => api.getCached('/experience') || []);
    const [loading, setLoading] = useState(() => !api.getCached('/experience'));

    useEffect(() => {
        api.get('/experience').then(setExperiences).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading && experiences.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-24 section-padding">
            <div className="section-container">
                <div className="text-center mb-16 animate-fadeInUp">
                    <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">My Journey</p>
                    <h1 className="section-title">Professional Experience</h1>
                    <p className="section-subtitle mx-auto">A timeline of my professional career and contributions</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-cyan to-primary-500/20" />

                    {experiences.map((exp, i) => (
                        <div key={exp._id || i}
                            className={`relative flex flex-col lg:flex-row gap-8 mb-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                }`}>
                            <div className="absolute left-4 lg:left-1/2 w-4 h-4 -ml-2 lg:-ml-2 mt-2
                            bg-primary-500 rounded-full ring-4 ring-dark-900 z-10" />

                            <div className={`flex-1 ml-12 lg:ml-0 ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                                <div className="glass-card-hover p-6">
                                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}>
                                        <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-medium rounded-full">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-heading font-bold mb-1">{exp.role}</h3>
                                    <p className="text-primary-300 font-medium mb-4">{exp.organization}</p>

                                    {exp.responsibilities?.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-white/70 text-sm font-semibold mb-2">Responsibilities:</h4>
                                            <ul className={`space-y-1 ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                                                {exp.responsibilities.map((r, j) => (
                                                    <li key={j} className="text-white/50 text-sm flex items-start gap-2">
                                                        <span className="text-primary-400 mt-1 flex-shrink-0">•</span>{r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {exp.achievements?.length > 0 && (
                                        <div>
                                            <h4 className="text-white/70 text-sm font-semibold mb-2">Achievements:</h4>
                                            <ul className={`space-y-1 ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                                                {exp.achievements.map((a, j) => (
                                                    <li key={j} className="text-accent-cyan text-sm flex items-start gap-2">
                                                        <span className="mt-1 flex-shrink-0">✦</span>{a}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="hidden lg:block flex-1" />
                        </div>
                    ))}
                </div>

                {experiences.length === 0 && !loading && (
                    <div className="text-center py-20 text-white/40">
                        <span className="text-5xl block mb-4">💼</span>
                        <p>Experience details coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
