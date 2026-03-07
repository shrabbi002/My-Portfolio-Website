'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function HomePage() {
  const [hero, setHero] = useState(() => api.getCached('/hero'));
  const [skills, setSkills] = useState(() => api.getCached('/skills') || []);
  const [projects, setProjects] = useState(() => api.getCached('/projects') || []);
  const [about, setAbout] = useState(() => api.getCached('/about'));
  const [experience, setExperience] = useState(() => api.getCached('/experience') || []);
  const [publications, setPublications] = useState(() => api.getCached('/publications') || []);
  const [blog, setBlog] = useState(() => api.getCached('/blog') || []);
  const [certs, setCerts] = useState(() => api.getCached('/certifications') || []);
  const [contact, setContact] = useState(() => api.getCached('/contact'));
  const [loading, setLoading] = useState(() => !api.getCached('/hero'));

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [h, s, p, a, e, pub, b, c, ct] = await Promise.all([
          api.get('/hero').catch(() => null),
          api.get('/skills').catch(() => []),
          api.get('/projects').catch(() => []),
          api.get('/about').catch(() => null),
          api.get('/experience').catch(() => []),
          api.get('/publications').catch(() => []),
          api.get('/blog').catch(() => []),
          api.get('/certifications').catch(() => []),
          api.get('/contact').catch(() => null),
        ]);
        setHero(h); setSkills(s); setProjects(p); setAbout(a);
        setExperience(e); setPublications(pub); setBlog(b); setCerts(c); setContact(ct);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading && !hero) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="overflow-hidden">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen flex items-center bg-hero-gradient">
        <div className="floating-shape top-20 right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="floating-shape bottom-20 left-10 w-48 h-48 bg-accent-cyan/10 rounded-full blur-3xl animate-float-delayed" />
        <svg className="floating-shape top-32 right-1/3 w-8 h-8 text-primary-400 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L22 12L12 22L2 12Z" />
        </svg>
        <svg className="floating-shape top-1/2 right-20 w-6 h-6 text-white/20 animate-float-delayed" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
        </svg>
        <svg className="floating-shape bottom-1/3 left-1/4 w-10 h-10 text-accent-cyan/30 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
            <div className="animate-fadeInLeft">
              <p className="text-primary-400 font-medium mb-4 tracking-wider uppercase text-sm">
                Welcome to my Portfolio
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black leading-tight mb-6">
                {hero?.headline || 'Build Your Awesome Platform'}
              </h1>
              <p className="text-lg text-primary-300 font-medium mb-4">
                {hero?.subtitle || 'Software QA Engineer | System Analyst | Data Analyst | Researcher'}
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                {hero?.introduction || 'A passionate professional delivering excellence across software development, quality assurance, business analysis, and AI research.'}
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/projects" className="btn-primary">
                  View Projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-outline">Contact Me</Link>
                <a href={hero?.cvFile ? api.getFileUrl(hero.cvFile) : '/cv.pdf'} download="CV.pdf" className="btn-outline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 5v14M12 19l-5-5M12 19l5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Download CV
                </a>
              </div>

              {hero?.highlights?.length > 0 && (
                <div className="flex flex-wrap gap-8">
                  {hero.highlights.map((h, i) => (
                    <div key={i} className="text-center">
                      <p className="text-3xl font-heading font-bold gradient-text">{h.number}</p>
                      <p className="text-white/50 text-sm mt-1">{h.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative animate-fadeInRight hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto group">
                {/* Outer rotating gradient ring */}
                <div className="absolute -inset-3 rounded-[2rem] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, #6c5ce7, #00d4ff, #ff6b9d, #6c5ce7)',
                    animation: 'spin 8s linear infinite',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '3px',
                  }} />

                {/* Inner glow ring */}
                <div className="absolute -inset-1 rounded-[1.8rem] bg-gradient-to-br from-primary-500/20 via-transparent to-accent-cyan/20 animate-borderGlow" />

                {/* Tilted background frames */}
                <div className="absolute inset-3 rounded-3xl border border-primary-500/20 rotate-3 group-hover:rotate-6 transition-transform duration-700" />
                <div className="absolute inset-2 rounded-3xl border border-accent-cyan/10 -rotate-2 group-hover:-rotate-5 transition-transform duration-700" />

                {/* Main photo with vibrate on hover */}
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden group-hover:animate-vibrate">
                  {hero?.profileImage ? (
                    <img src={api.getFileUrl(hero.profileImage)} alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <img src="/profile.png" alt="MD Sakhawat Hossain Rabbi"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Orbiting dots */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="animate-orbit">
                    <div className="w-3 h-3 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="animate-orbit-reverse">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary-400/50 rounded-tl-xl animate-borderGlow" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-accent-cyan/50 rounded-tr-xl animate-borderGlow" style={{ animationDelay: '0.5s' }} />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-accent-cyan/50 rounded-bl-xl animate-borderGlow" style={{ animationDelay: '1s' }} />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary-400/50 rounded-br-xl animate-borderGlow" style={{ animationDelay: '1.5s' }} />

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-primary-400/30 rounded-full animate-pulse-slow" />
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary-500/10 rounded-2xl rotate-12 animate-float" />
                <div className="absolute top-1/2 -right-10 w-4 h-4 bg-accent-cyan/40 rounded-full animate-float-delayed" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* ═══ ABOUT GLANCE ═══ */}
      <section className="section-padding bg-dark-900">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              {about?.image ? (
                <img src={api.getFileUrl(about.image)} alt="About" className="rounded-3xl w-full object-cover h-80" />
              ) : (
                <div className="rounded-3xl bg-dark-800/50 h-80 flex items-center justify-center">
                  <span className="text-8xl opacity-20">🧑‍💼</span>
                </div>
              )}
            </div>
            <div className="lg:col-span-3">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">About Me</p>
              <h2 className="section-title mb-4">Who I Am</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                {about?.biography || 'A passionate software professional with expertise in QA engineering, system analysis, and AI research.'}
              </p>
              {about?.expertise?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {about.expertise.map((e, i) => (
                    <span key={i} className="px-3 py-1.5 glass-card text-primary-300 text-xs font-medium">{e}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SKILLS OVERVIEW ═══ */}
      {skills.length > 0 && (
        <section className="section-padding bg-dark-800/30">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Expertise</p>
              <h2 className="section-title">Skills & Technologies</h2>
              <p className="section-subtitle mx-auto">A snapshot of my technical competencies</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {skills.map((cat, i) => (
                <div key={cat._id || i} className="glass-card-hover p-6 text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon || '⚡'}</div>
                  <h3 className="font-heading font-semibold text-white mb-3">{cat.category}</h3>
                  <div className="space-y-1">
                    {cat.skills?.map((s, j) => (
                      <p key={j} className="text-white/50 text-sm">{s.name}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FEATURED PROJECTS ═══ */}
      {projects.length > 0 && (
        <section className="section-padding bg-dark-900">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle mx-auto">Recent work and implementations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div key={project._id || i} className="glass-card-hover overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-primary-500/20 to-dark-700 relative overflow-hidden">
                    {project.screenshots?.[0] ? (
                      <img src={api.getFileUrl(project.screenshots[0])} alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">📁</div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-primary-500/80 backdrop-blur-sm text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, j) => (
                        <span key={j} className="px-2 py-1 bg-dark-700/50 text-white/60 text-xs rounded-lg">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ EXPERIENCE GLANCE ═══ */}
      {experience.length > 0 && (
        <section className="section-padding bg-dark-800/30">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Career</p>
              <h2 className="section-title">Professional Experience</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experience.map((exp, i) => (
                <div key={exp._id || i} className="glass-card-hover p-6">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-medium rounded-full">
                    {exp.startDate} — {exp.endDate}
                  </span>
                  <h3 className="text-lg font-heading font-bold mt-3 mb-1">{exp.role}</h3>
                  <p className="text-primary-300 text-sm mb-3">{exp.organization}</p>
                  {exp.responsibilities?.length > 0 && (
                    <ul className="space-y-1">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="text-white/50 text-sm flex items-start gap-2">
                          <span className="text-primary-400 mt-1 flex-shrink-0">•</span>{r}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RESEARCH GLANCE ═══ */}
      {publications.length > 0 && (
        <section className="section-padding bg-dark-900">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Academic</p>
              <h2 className="section-title">Research & Publications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publications.map((pub, i) => (
                <div key={pub._id || i} className="glass-card-hover p-6 flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${pub.type === 'journal' ? 'bg-primary-500/20' :
                    pub.type === 'conference' ? 'bg-accent-cyan/20' :
                      'bg-accent-pink/20'
                    }`}>
                    {pub.type === 'journal' ? '📄' : pub.type === 'conference' ? '🎤' : '🔬'}
                  </div>
                  <div>
                    <span className={`text-xs font-medium capitalize ${pub.type === 'journal' ? 'text-primary-300' :
                      pub.type === 'conference' ? 'text-accent-cyan' :
                        'text-accent-pink'
                      }`}>{pub.type} · {pub.year}</span>
                    <h3 className="font-semibold text-sm mt-1">{pub.title}</h3>
                    {pub.journal && <p className="text-white/40 text-xs mt-1">{pub.journal}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ BLOG GLANCE ═══ */}
      {blog.length > 0 && (
        <section className="section-padding bg-dark-800/30">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Insights</p>
              <h2 className="section-title">Latest Blog Posts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blog.map((post, i) => (
                <Link href={`/blog/${post.slug}`} key={post._id || i} className="glass-card-hover overflow-hidden group block">
                  <div className="h-40 bg-gradient-to-br from-primary-500/20 to-dark-700 relative overflow-hidden">
                    {post.featuredImage ? (
                      <img src={api.getFileUrl(post.featuredImage)} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">📝</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-white/40 text-xs mb-2">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="font-heading font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2">{post.excerpt || post.content?.substring(0, 100)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CERTIFICATIONS GLANCE ═══ */}
      {certs.length > 0 && (
        <section className="section-padding bg-dark-900">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Credentials</p>
              <h2 className="section-title">Certifications & Achievements</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certs.map((cert, i) => (
                <div key={cert._id || i} className="glass-card-hover p-5 text-center group">
                  <div className="text-3xl mb-3">
                    {cert.type === 'certification' ? '🎓' : cert.type === 'award' ? '🏆' : '🥇'}
                  </div>
                  <h3 className="font-heading font-semibold text-sm group-hover:text-primary-400 transition-colors mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-white/40 text-xs">{cert.organization} · {cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CONTACT CTA ═══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-cyan/10" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-400 font-medium mb-2 uppercase tracking-wider text-sm">Get in Touch</p>
              <h2 className="section-title mb-4">Let&apos;s Work Together</h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Interested in collaboration, research partnerships, or just want to connect? I&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Get In Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/projects" className="btn-outline text-lg px-8 py-4">Explore Projects</Link>
              </div>
            </div>
            <div className="space-y-4">
              {contact?.email && (
                <div className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-lg">📧</div>
                  <a href={`mailto:${contact.email}`} className="text-white/70 hover:text-primary-400 transition-colors text-sm">{contact.email}</a>
                </div>
              )}
              {contact?.linkedin && (
                <div className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-lg">💼</div>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary-400 transition-colors text-sm">LinkedIn Profile</a>
                </div>
              )}
              {contact?.github && (
                <div className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-lg">🔗</div>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-primary-400 transition-colors text-sm">GitHub Profile</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
