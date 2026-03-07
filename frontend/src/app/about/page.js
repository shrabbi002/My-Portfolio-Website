'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AboutPage() {
    const [about, setAbout] = useState(() => api.getCached('/about'));
    const [loading, setLoading] = useState(() => !api.getCached('/about'));

    useEffect(() => {
        api.get('/about').then(setAbout).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading && !about) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-24 section-padding">
            <div className="section-container">
                <div className="text-center mb-16 animate-fadeInUp">
                    <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Get to Know Me</p>
                    <h1 className="section-title">About Me</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Side */}
                    <div className="animate-fadeInLeft">
                        <div className="relative">
                            <div className="absolute inset-4 rounded-3xl border-2 border-primary-500/20 rotate-2" />
                            {about?.image ? (
                                <img src={api.getFileUrl(about.image)} alt="About" className="relative rounded-3xl w-full object-cover" />
                            ) : (
                                <div className="relative rounded-3xl bg-dark-800/50 h-96 flex items-center justify-center">
                                    <span className="text-9xl opacity-20">🧑‍💼</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="animate-fadeInRight space-y-8">
                        {about?.biography && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-4 gradient-text">Biography</h2>
                                <p className="text-white/70 leading-relaxed">{about.biography}</p>
                            </div>
                        )}
                        {about?.careerJourney && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-4 gradient-text">Career Journey</h2>
                                <p className="text-white/70 leading-relaxed">{about.careerJourney}</p>
                            </div>
                        )}
                        {about?.education && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-4 gradient-text">Education</h2>
                                <p className="text-white/70 leading-relaxed">{about.education}</p>
                            </div>
                        )}
                        {about?.expertise?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-4 gradient-text">Areas of Expertise</h2>
                                <div className="flex flex-wrap gap-3">
                                    {about.expertise.map((e, i) => (
                                        <span key={i} className="px-4 py-2 glass-card text-primary-300 text-sm font-medium">{e}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {about?.goals && (
                            <div>
                                <h2 className="text-2xl font-heading font-bold mb-4 gradient-text">Goals & Research Interests</h2>
                                <p className="text-white/70 leading-relaxed">{about.goals}</p>
                            </div>
                        )}
                        {about?.philosophy && (
                            <div className="glass-card p-6 border-l-4 border-primary-500">
                                <p className="text-white/80 italic text-lg leading-relaxed">&ldquo;{about.philosophy}&rdquo;</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
