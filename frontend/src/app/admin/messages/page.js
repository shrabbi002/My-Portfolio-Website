'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);

    const load = () => api.get('/contact/messages').then(setMessages).catch(console.error);
    useEffect(() => { load(); }, []);

    const markRead = async (id) => {
        try { await api.put(`/contact/messages/${id}`); load(); } catch (e) { console.error(e); }
    };

    const deleteMsg = async (id) => {
        if (!confirm('Delete this message?')) return;
        try { await api.delete(`/contact/messages/${id}`); setSelected(null); load(); } catch (e) { alert(e.message); }
    };

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-heading font-bold">Contact Messages</h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Message list */}
                <div className="lg:col-span-2 space-y-2 max-h-[600px] overflow-y-auto">
                    {messages.map((msg, i) => (
                        <button key={msg._id || i}
                            onClick={() => { setSelected(msg); if (!msg.isRead) markRead(msg._id); }}
                            className={`w-full text-left p-4 rounded-xl transition-all ${selected?._id === msg._id ? 'bg-primary-500/20 border border-primary-500/30' :
                                    msg.isRead ? 'bg-dark-800/30 hover:bg-dark-800/50' : 'bg-primary-500/10 border border-primary-500/20'
                                }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-sm">{msg.name}</p>
                                    <p className="text-white/40 text-xs">{msg.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {!msg.isRead && <span className="w-2 h-2 bg-primary-500 rounded-full" />}
                                    <span className="text-white/30 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            {msg.subject && <p className="text-primary-300 text-xs mt-1 truncate">{msg.subject}</p>}
                        </button>
                    ))}
                    {messages.length === 0 && <p className="text-center text-white/40 py-8">No messages</p>}
                </div>

                {/* Message detail */}
                <div className="lg:col-span-3">
                    {selected ? (
                        <div className="glass-card p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-heading font-semibold text-lg">{selected.subject || 'No Subject'}</h3>
                                    <p className="text-white/50 text-sm">From: {selected.name} &lt;{selected.email}&gt;</p>
                                    <p className="text-white/30 text-xs">{new Date(selected.createdAt).toLocaleString()}</p>
                                </div>
                                <button onClick={() => deleteMsg(selected._id)} className="text-red-400 hover:underline text-sm">Delete</button>
                            </div>
                            <div className="border-t border-white/10 pt-4">
                                <p className="text-white/70 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                            </div>
                            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`}
                                className="btn-primary inline-flex">Reply via Email</a>
                        </div>
                    ) : (
                        <div className="glass-card p-12 text-center text-white/30">
                            <span className="text-4xl block mb-4">💬</span>
                            <p>Select a message to read</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
