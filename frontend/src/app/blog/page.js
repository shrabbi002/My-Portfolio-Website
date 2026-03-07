'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function BlogPage() {
    const [posts, setPosts] = useState(() => api.getCached('/blog') || []);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(() => !api.getCached('/blog'));

    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (category !== 'All') params.set('category', category);
        api.get(`/blog?${params.toString()}`).then(setPosts).catch(console.error).finally(() => setLoading(false));
    }, [search, category]);

    const categories = ['All', 'AI & Machine Learning', 'Software Testing', 'Business Analysis', 'System Architecture', 'Research'];

    if (loading && posts.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-24 section-padding">
            <div className="section-container">
                <div className="text-center mb-16 animate-fadeInUp">
                    <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Insights & Articles</p>
                    <h1 className="section-title">Blog</h1>
                    <p className="section-subtitle mx-auto">Sharing knowledge and technical perspectives</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search articles..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-field pl-12" />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${category === cat
                                    ? 'bg-primary-500 text-white shadow-glow'
                                    : 'bg-dark-800/50 text-white/50 hover:text-white hover:bg-dark-700/50'
                                }`}>
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <Link href={`/blog/${post.slug}`} key={post._id || i} className="glass-card-hover overflow-hidden group block">
                            <div className="h-48 bg-gradient-to-br from-primary-500/20 to-dark-700 relative overflow-hidden">
                                {post.featuredImage ? (
                                    <img src={api.getFileUrl(post.featuredImage)} alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-6xl opacity-20">📝</span>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 bg-primary-500/80 backdrop-blur-sm text-xs font-medium rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-white/40 text-xs mb-2">
                                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-white/50 text-sm line-clamp-3">{post.excerpt || post.content?.substring(0, 150)}</p>
                                {post.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {post.tags.slice(0, 3).map((tag, j) => (
                                            <span key={j} className="px-2 py-1 bg-dark-700/50 text-white/50 text-xs rounded-lg">#{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && !loading && (
                    <div className="text-center py-20 text-white/40">
                        <span className="text-5xl block mb-4">📝</span>
                        <p>No blog posts yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
