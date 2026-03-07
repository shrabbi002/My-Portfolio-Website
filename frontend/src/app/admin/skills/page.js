'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminSkills() {
    const [categories, setCategories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ category: '', icon: '', skills: [] });
    const [msg, setMsg] = useState('');

    const load = () => api.get('/skills').then(setCategories).catch(console.error);
    useEffect(() => { load(); }, []);

    const startNew = () => { setEditing('new'); setForm({ category: '', icon: '', skills: [{ name: '', proficiency: 80 }] }); };
    const startEdit = (cat) => { setEditing(cat._id); setForm({ ...cat }); };

    const addSkill = () => setForm({ ...form, skills: [...form.skills, { name: '', proficiency: 80 }] });
    const updateSkill = (i, field, val) => {
        const s = [...form.skills]; s[i] = { ...s[i], [field]: field === 'proficiency' ? parseInt(val) || 0 : val }; setForm({ ...form, skills: s });
    };
    const removeSkill = (i) => setForm({ ...form, skills: form.skills.filter((_, idx) => idx !== i) });

    const save = async () => {
        try {
            if (editing === 'new') await api.post('/skills', form);
            else await api.put(`/skills/${editing}`, form);
            setEditing(null); load(); setMsg('Saved!'); setTimeout(() => setMsg(''), 3000);
        } catch (e) { setMsg('Error: ' + e.message); }
    };

    const deleteCategory = async (id) => {
        if (!confirm('Delete this skill category?')) return;
        try { await api.delete(`/skills/${id}`); load(); } catch (e) { alert(e.message); }
    };

    return (
        <div className="max-w-4xl space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-heading font-bold">Skills Manager</h1>
                <button onClick={startNew} className="btn-primary">+ Add Category</button>
            </div>
            {msg && <div className="p-3 bg-green-500/20 text-green-300 rounded-xl text-sm">{msg}</div>}

            {editing && (
                <div className="glass-card p-6 space-y-4 border border-primary-500/30">
                    <h3 className="font-heading font-semibold">{editing === 'new' ? 'New Category' : 'Edit Category'}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-white/50 text-sm mb-1">Category Name</label>
                            <input className="input-field" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
                        <div><label className="block text-white/50 text-sm mb-1">Icon (emoji)</label>
                            <input className="input-field" value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="💻" /></div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-white/50 text-sm">Skills</label>
                            <button onClick={addSkill} className="text-primary-400 text-sm hover:underline">+ Add Skill</button>
                        </div>
                        {form.skills?.map((s, i) => (
                            <div key={i} className="flex gap-3 mb-2 items-center">
                                <input className="input-field flex-1" placeholder="Skill name" value={s.name || ''} onChange={e => updateSkill(i, 'name', e.target.value)} />
                                <input type="number" min={0} max={100} className="input-field w-20" value={s.proficiency || 0} onChange={e => updateSkill(i, 'proficiency', e.target.value)} />
                                <span className="text-white/30 text-sm w-4">%</span>
                                <button onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-300">✕</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={save} className="btn-primary">Save</button>
                        <button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
                    </div>
                </div>
            )}

            {categories.map((cat, i) => (
                <div key={cat._id || i} className="glass-card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{cat.icon || '⚡'}</span>
                            <h3 className="font-heading font-semibold">{cat.category}</h3>
                            <span className="text-white/30 text-sm">({cat.skills?.length} skills)</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(cat)} className="text-primary-400 hover:underline text-sm">Edit</button>
                            <button onClick={() => deleteCategory(cat._id)} className="text-red-400 hover:underline text-sm">Delete</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {cat.skills?.map((s, j) => (
                            <div key={j} className="flex justify-between text-sm">
                                <span className="text-white/70">{s.name}</span>
                                <span className="text-primary-400">{s.proficiency}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
