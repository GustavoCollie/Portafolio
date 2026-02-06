import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/presentation/hooks/useScrollReveal';
import { Rocket, Globe, Database, AppWindow } from 'lucide-react';

type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'bi' | 'data';

interface ProjectMetric {
  label: string;
  value: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  link?: string;
  imageUrl?: string;
  featured: boolean;
  metrics?: ProjectMetric[];
  startDate: string;
  endDate?: string;
}

interface ProjectsSectionProps {
  projects: ProjectData[];
}

const categoryConfig: Record<ProjectCategory, { label: string; color: string; icon: string }> = {
  fullstack: { label: 'Full Stack', color: 'bg-indigo-500', icon: '🚀' },
  frontend: { label: 'Frontend', color: 'bg-blue-500', icon: '🎨' },
  backend: { label: 'Backend', color: 'bg-green-500', icon: '⚙️' },
  bi: { label: 'BI / Analytics', color: 'bg-violet-500', icon: '📊' },
  data: { label: 'Data', color: 'bg-amber-500', icon: '📈' },
};

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const categoryInfo = categoryConfig[project.category];

  const handleImageClick = () => {
    if (project.link || project.liveUrl) {
      window.open(project.link || project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (project.repositoryUrl) {
      window.open(project.repositoryUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={ref}
      className={`
        group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700
        hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-700 hover:-translate-y-2
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}
      `}
      style={{ transitionDelay: `${(index % 3) * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative h-52 bg-gradient-to-br from-indigo-100 via-violet-50 to-purple-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 cursor-pointer overflow-hidden"
        onClick={handleImageClick}
      >
        {project.imageUrl && !imageError ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-2 block drop-shadow-lg">{categoryInfo.icon}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {project.title}
              </span>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="flex gap-3">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/95 hover:bg-white text-slate-800 rounded-lg font-medium text-sm flex items-center gap-2 transition-all hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {(project.liveUrl || project.link) && (
              <a
                href={project.link || project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-all hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {project.link ? 'Visitar' : 'Demo'}
              </a>
            )}
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 text-xs font-semibold text-white rounded-full ${categoryInfo.color} shadow-lg`}>
            {categoryInfo.label}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 text-xs font-semibold bg-amber-400 text-amber-900 rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            {project.metrics.map((metric, index) => (
              <div key={index} className="text-center flex-1">
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons (mobile) */}
        <div className="flex gap-2 mt-4 md:hidden">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium text-sm text-center transition-colors"
            >
              GitHub
            </a>
          )}
          {(project.liveUrl || project.link) && (
            <a
              href={project.link || project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm text-center transition-colors"
            >
              {project.link ? 'Visitar' : 'Demo'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
          <Rocket className="absolute top-20 left-[10%] w-48 h-48 text-indigo-200/5 -rotate-12 blur-[1px]" />
          <Globe className="absolute bottom-40 right-[5%] w-64 h-64 text-blue-200/5 rotate-12 blur-[1px]" />
          <Database className="absolute top-1/3 right-[15%] w-40 h-40 text-violet-200/5 -rotate-6 blur-[0.5px]" />
          <AppWindow className="absolute bottom-1/4 left-[20%] w-48 h-48 text-white/5 rotate-12 blur-[0.5px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-indigo-300 text-sm font-semibold rounded-full mb-4 border border-white/10">
            Portafolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mi experiencia en desarrollo full stack
          </p>
        </div>


        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
