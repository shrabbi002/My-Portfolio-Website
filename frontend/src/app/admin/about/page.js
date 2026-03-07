'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminAbout() {
    const [data, setData] = useState({ biography: '', careerJourney: '', education: '', expertise: [], goals: '', philosophy: '', image: '' });
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');
    const [newExpertise, setNewExpertise] = useState('');

    useEffect(() => { api.get('/about').then(setData).catch(console.error); }, []);

    const save = async () => {
        setSaving(true);
        try { await api.put('/about', data); setMsg('Saved!'); setTimeout(() => setMsg(''), 3000); }
        catch (e) { setMsg('Error: ' + e.message); }
        setSaving(false);
    };

    const addExpertise = () => {
        if (newExpertise.trim()) { setData({ ...data, expertise: [...(data.expertise || []), newExpertise.trim()] }); setNewExpertise(''); }
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try { const res = await api.upload(file); setData({ ...data, image: res.url }); } catch (e) { alert(e.message); }
    };

    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-heading font-bold">About Section</h1>
                <button onClick={save} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
            {msg && <div className="p-3 bg-green-500/20 text-green-300 rounded-xl text-sm">{msg}</div>}

            <div className="glass-card p-6 space-y-5">
                <div><label className="block text-white/50 text-sm mb-2">Biography</label>
                    <textarea className="input-field" rows={4} value={data.biography || ''} onChange={e => setData({ ...data, biography: e.target.value })} /></div>
                <div><label className="block text-white/50 text-sm mb-2">Career Journey</label>
                    <textarea className="input-field" rows={3} value={data.careerJourney || ''} onChange={e => setData({ ...data, careerJourney: e.target.value })} /></div>
                <div><label className="block text-white/50 text-sm mb-2">Education</label>
                    <textarea className="input-field" rows={2} value={data.education || ''} onChange={e => setData({ ...data, education: e.target.value })} /></div>
                <div><label className="block text-white/50 text-sm mb-2">Goals & Research Interests</label>
                    <textarea className="input-field" rows={3} value={data.goals || ''} onChange={e => setData({ ...data, goals: e.target.value })} /></div>
                <div><label className="block text-white/50 text-sm mb-2">Work Philosophy</label>
                    <textarea className="input-field" rows={2} value={data.philosophy || ''} onChange={e => setData({ ...data, philosophy: e.target.value })} /></div>
                <div><label className="block text-white/50 text-sm mb-2">Image</label>
                    <input type="file" accept="image/*" onChange={uploadImage} className="text-sm text-white/50" />
                    {data.image && <img src={api.getFileUrl(data.image)} className="mt-2 h-32 rounded-xl object-cover" alt="" />}
                </div>
            </div>

            <div className="glass-card p-6">
                <h3 className="font-heading font-semibold mb-4">Areas of Expertise</h3>
                <div className="flex gap-2 mb-4">
                    <input className="input-field flex-1" placeholder="Add expertise..." value={newExpertise}
                        onChange={e => setNewExpertise(e.target.value)} onKeyDown={e => e.key === 'Enter' && addExpertise()} />
                    <button onClick={addExpertise} className="btn-primary">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.expertise?.map((e, i) => (
                        <span key={i} className="px-3 py-1.5 glass-card text-sm flex items-center gap-2">
                            {e} <button onClick={() => setData({ ...data, expertise: data.expertise.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-300">✕</button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
