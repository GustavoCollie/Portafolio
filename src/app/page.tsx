'use client';

import { ContactQRModal } from '../presentation/components/contact/ContactQRModal';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { SkillsSection } from '../presentation/components/sections/SkillsSection';
import { Github, Plane, Share2, Code } from 'lucide-react';
import { ExperienceSection } from '../presentation/components/sections/ExperienceSection';
import { ProjectsSection } from '../presentation/components/sections/ProjectsSection';
import { portfolioData } from '../infrastructure/config/portfolio-data';
import { useScrollReveal } from '../presentation/hooks/useScrollReveal';
import { ScrollReveal } from '../presentation/components/ui/ScrollReveal';

const DownloadCVButton = dynamic(
  () => import('../presentation/components/cv/DownloadCVButton').then(mod => ({ default: mod.DownloadCVButton })),
  { ssr: false, loading: () => <button className="px-5 py-2.5 bg-slate-700 text-slate-400 rounded-lg font-medium cursor-wait flex items-center gap-2">Cargando...</button> }
);

// Typewriter Hook
function useTypewriter(text: string, speed: number = 100, delay: number = 500) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeout = setTimeout(function type() {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}

// Flip Avatar Component
function FlipAvatar({ initials, imageUrl }: { initials: string; imageUrl?: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-40 h-40 mx-auto mb-8 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front - Photo */}
        <div
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 ring-4 ring-white/20 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Profile Front" className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl text-white font-bold">{initials}</span>
          )}
        </div>

        {/* Back - Photo */}
        <div
          className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-violet-500/40 ring-4 ring-white/20 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Profile Back" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-white">
              <span className="text-4xl">🚀</span>
              <p className="text-xs mt-1 font-medium">Tech & Biz</p>
            </div>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl -z-10 animate-pulse" />
    </div>
  );
}

// Counter Animation Component
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref}>
      {count}{suffix}
    </div>
  );
}

interface PortfolioState {
  isLoading: boolean;
  error: Error | null;
}

export default function HomePage() {
  const [state, setState] = useState<PortfolioState>({
    isLoading: true,
    error: null,
  });
  const [showContent, setShowContent] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const { profile, skills, experiences, projects } = portfolioData;
  const { displayText, isComplete } = useTypewriter(profile.fullName, 120, 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({ isLoading: false, error: null });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      setTimeout(() => setShowContent(true), 200);
    }
  }, [state.isLoading]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400 mx-auto mb-4" />
          <p className="text-slate-400">Cargando portafolio...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {state.error.message}</p>
      </div>
    );
  }

  const initials = profile.fullName.split(' ').map(n => n[0]).join('');

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-lg">
              {profile.fullName.split(' ')[0]}
              <span className="text-indigo-400">.</span>
            </span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-slate-300 hover:text-white text-sm transition-colors">Sobre mí</a>
              <a href="#experience" className="text-slate-300 hover:text-white text-sm transition-colors">Experiencia</a>
              <a href="#projects" className="text-slate-300 hover:text-white text-sm transition-colors">Proyectos</a>
              <a href="#skills" className="text-slate-300 hover:text-white text-sm transition-colors">Skills</a>
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          {/* Floating Icons Background */}
          <Github className="absolute top-10 right-[10%] w-48 h-48 text-white/5 rotate-12 blur-[1px]" />
          <Plane className="absolute bottom-20 left-[5%] w-64 h-64 text-indigo-200/5 -rotate-12 blur-[1px]" />
          <Share2 className="absolute top-1/3 left-[15%] w-40 h-40 text-violet-200/5 rotate-45 blur-[0.5px]" />
          <Code className="absolute bottom-1/3 right-[15%] w-48 h-48 text-white/5 -rotate-6 blur-[0.5px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Flip Avatar with animation */}
          <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <FlipAvatar initials={initials} imageUrl={profile.avatarUrl} />
          </div>

          {/* Typewriter Name */}
          <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 h-[1.2em] transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {displayText}
            <span
              className={`inline-block w-1 h-[1em] bg-indigo-400 ml-1 align-middle ${isComplete ? 'animate-pulse' : ''
                }`}
              style={{
                animation: isComplete ? undefined : 'blink 0.8s infinite',
              }}
            />
          </h1>

          <p className={`text-xl md:text-2xl text-indigo-300 mb-2 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {profile.title}
          </p>
          <p className={`text-lg text-violet-400 mb-6 transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {profile.subtitle}
          </p>
          <p className={`text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {profile.summary}
          </p>

          {/* Social Links */}
          <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-[900ms] ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-5 py-2.5 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-medium transition-all hover:scale-105"
            >
              Contactar
            </button>
          </div>

          {/* CTA */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-[1100ms] ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="#projects"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              Ver Proyectos
            </a>
            <DownloadCVButton />
          </div>
        </div>
      </section>

      {/* Quick Stats with scroll animation */}
      <section className="py-12 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-indigo-600 transition-transform group-hover:scale-110">
                <AnimatedCounter value={experiences.length} suffix="+" />
              </div>
              <div className="text-sm text-slate-500 mt-1">Años Experiencia</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-violet-600 transition-transform group-hover:scale-110">
                <AnimatedCounter value={projects.length} />
              </div>
              <div className="text-sm text-slate-500 mt-1">Proyectos</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-blue-600 transition-transform group-hover:scale-110">
                <AnimatedCounter value={profile.certifications.length} />
              </div>
              <div className="text-sm text-slate-500 mt-1">Certificaciones</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-emerald-600 transition-transform group-hover:scale-110">
                <AnimatedCounter value={skills.length} suffix="+" />
              </div>
              <div className="text-sm text-slate-500 mt-1">Tecnologías</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <div id="experience">
        <ExperienceSection experiences={experiences as any} />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <ProjectsSection projects={projects as any} />
      </div>

      {/* Skills Section */}
      <div id="skills">
        <SkillsSection skills={skills as any} />
      </div>

      {/* Footer with animation */}
      <footer className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-125"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-125"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-slate-400 hover:text-white transition-all hover:scale-125"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {profile.fullName}. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Keyframes for cursor blink */}
      <style jsx global>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <ContactQRModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        phoneNumber="995876300"
      />
    </main>
  );
}
