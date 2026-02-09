import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '@/presentation/hooks/useScrollReveal';
import { Github } from 'lucide-react';

type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'bi-tools'
  | 'data-analysis'
  | 'soft-skills'
  | 'business';

type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface SkillData {
  id: { value: string } | string;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsOfExperience: number;
  icon?: string;
  featured: boolean;
}

interface SkillsSectionProps {
  skills: SkillData[];
}

type ViewMode = 'all' | 'tech' | 'business';

const categoryConfig: Record<SkillCategory, { label: string; icon: string; color: string }> = {
  frontend: { label: 'Frontend', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
  backend: { label: 'Backend', icon: '⚙️', color: 'from-green-500 to-emerald-500' },
  database: { label: 'Databases', icon: '🗄️', color: 'from-amber-500 to-orange-500' },
  devops: { label: 'DevOps & Cloud', icon: '☁️', color: 'from-purple-500 to-violet-500' },
  'bi-tools': { label: 'BI Tools', icon: '📊', color: 'from-indigo-500 to-blue-500' },
  'data-analysis': { label: 'Data Analysis', icon: '📈', color: 'from-teal-500 to-cyan-500' },
  'soft-skills': { label: 'Soft Skills', icon: '🤝', color: 'from-pink-500 to-rose-500' },
  business: { label: 'Business', icon: '💼', color: 'from-violet-500 to-purple-500' },
};

const proficiencyConfig: Record<ProficiencyLevel, { label: string; percentage: number }> = {
  beginner: { label: 'Beginner', percentage: 25 },
  intermediate: { label: 'Intermediate', percentage: 50 },
  advanced: { label: 'Advanced', percentage: 75 },
  expert: { label: 'Expert', percentage: 95 },
};

const techCategories: SkillCategory[] = ['frontend', 'backend', 'database', 'devops'];
const businessCategories: SkillCategory[] = ['bi-tools', 'data-analysis', 'business', 'soft-skills'];

function isTechSkill(category: SkillCategory): boolean {
  return techCategories.includes(category);
}

function isBusinessSkill(category: SkillCategory): boolean {
  return businessCategories.includes(category);
}

function getSkillId(skill: SkillData): string {
  if (typeof skill.id === 'string') return skill.id;
  return skill.id.value;
}

function getSkillIcon(iconName: string): string {
  const icons: Record<string, string> = {
    react: '⚛️',
    typescript: '📘',
    nextjs: '▲',
    nodejs: '🟢',
    python: '🐍',
    postgresql: '🐘',
    mongodb: '🍃',
    aws: '☁️',
    docker: '🐳',
    kubernetes: '☸️',
    powerbi: '📊',
    tableau: '📈',
    sql: '🗃️',
    datamodel: '🔷',
    strategy: '🎯',
    kpi: '📉',
    stakeholder: '🤝',
    leadership: '👔',
    git: '🔀',
    github: '🐙',
    scrum: '🔄',
    solid: '🧱',
    hexagonal: '🏗️',
  };
  return icons[iconName] ?? '💡';
}

  const SkillPill: React.FC<{ skill: SkillData; delay: number; isVisible: boolean }> = ({ skill, delay, isVisible }) => {
    const proficiency = proficiencyConfig[skill.proficiency];
    const formatExperience = (years: number, category: SkillCategory) => {
      // Category-specific overrides
      if (category === 'business') return '3a';
      if (category === 'soft-skills') return '2a';
      if (category === 'data-analysis') return '3a';

      if (years < 1) return `${Math.round(years * 12)}m`;
      return `${years}a`;
    };

  return (
    <div
      className={`
        group flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl px-3 py-2.5
        border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600
        hover:shadow-md transition-all duration-500 min-w-0 overflow-hidden
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {skill.icon && (
        <span className="text-xl flex-shrink-0">{getSkillIcon(skill.icon)}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-slate-800 dark:text-white text-sm truncate">
            {skill.name}
          </span>
          {skill.featured && (
            <span className="text-amber-500 text-xs">★</span>
          )}
        </div>
          <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ${isVisible ? '' : 'w-0'
                }`}
              style={{
                width: isVisible ? `${proficiency.percentage}%` : '0%',
                transitionDelay: `${delay + 300}ms`
              }}
            />
          </div>
          <span className="text-xs text-slate-400 flex-shrink-0 w-8">{formatExperience(skill.yearsOfExperience, skill.category)}</span>
        </div>
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ category: SkillCategory; skills: SkillData[]; index: number }> = ({
  category,
  skills,
  index,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const config = categoryConfig[category];

  return (
    <div
      ref={ref}
      className={`
        bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 overflow-hidden transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-lg shadow-lg`}>
          {config.icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white">
            {config.label}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {skills.length} skill{skills.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <div className="grid gap-2">
        {skills.map((skill, skillIndex) => (
          <SkillPill
            key={getSkillId(skill)}
            skill={skill}
            delay={skillIndex * 80}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>();

  const filteredSkills = skills.filter((skill) => {
    if (viewMode === 'all') return true;
    if (viewMode === 'tech') return isTechSkill(skill.category);
    return isBusinessSkill(skill.category);
  });

  const groupedSkills = filteredSkills.reduce(
    (acc, skill) => {
      const category = skill.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, SkillData[]>
  );

  const orderedCategories =
    viewMode === 'business'
      ? businessCategories
      : viewMode === 'tech'
        ? techCategories
        : [...techCategories, ...businessCategories];

  const techSkillCount = skills.filter((s) => isTechSkill(s.category)).length;
  const businessSkillCount = skills.filter((s) => isBusinessSkill(s.category)).length;

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-full mb-4">
            Competencias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Perfil híbrido que combina desarrollo full stack con inteligencia de negocios
          </p>

          {/* Waving GitHub Mascot */}
          <div className="absolute top-10 right-4 md:right-10 lg:right-20 hidden md:block opacity-20 dark:opacity-10 pointer-events-none">
            <Github className="w-24 h-24 md:w-32 md:h-32 text-slate-800 dark:text-white animate-wave" />
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`flex justify-center gap-8 mb-10 transition-all duration-700 delay-150 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{techSkillCount}</div>
            <div className="text-sm text-slate-500">Tech Skills</div>
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{businessSkillCount}</div>
            <div className="text-sm text-slate-500">Business Skills</div>
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{skills.length}</div>
            <div className="text-sm text-slate-500">Total</div>
          </div>
        </div>

        {/* View Toggle */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 delay-300 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5">
            {[
              { mode: 'all' as ViewMode, label: 'Todas', count: skills.length },
              { mode: 'tech' as ViewMode, label: 'Técnicas', count: techSkillCount },
              { mode: 'business' as ViewMode, label: 'Negocios', count: businessSkillCount },
            ].map(({ mode, label, count }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${viewMode === mode
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }
                `}
              >
                {label}
                <span className="ml-1.5 text-xs opacity-60">({count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orderedCategories.map(
            (category, index) =>
              groupedSkills[category] && groupedSkills[category].length > 0 && (
                <CategorySection
                  key={category}
                  category={category}
                  skills={groupedSkills[category]}
                  index={index}
                />
              )
          )}
        </div>

        {/* Legend */}
        <div
          className={`flex justify-center items-center gap-6 mt-10 text-xs text-slate-500 transition-all duration-700 ${statsVisible ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
            <span>Nivel de dominio</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span>Featured</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Xa</span>
            <span>= X años exp.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
