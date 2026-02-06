import React, { useState } from 'react';
import { useScrollReveal } from '@/presentation/hooks/useScrollReveal';

// We defining a local interface or importing from domain if strict hexagonal. 
// For now, we'll align with the props passed from the section, but ideally we should use the Domain Entity.
// However, to keep it simple and consistent with the codebase:

interface ExperienceData {
    id: string;
    company: string;
    role: string;
    description: string;
    type: 'tech' | 'business' | 'hybrid';
    startDate: string;
    endDate: string | null;
    technologies: string[];
    achievements: string[];
    kpis?: { label: string; value: string; improvement?: string }[];
    certificates?: string[];
}

interface ExperienceCardProps {
    experience: ExperienceData;
    index: number;
    onOpenCertificates: () => void;
}

const typeConfig = {
    tech: {
        label: 'Tech',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-l-blue-500'
    },
    business: {
        label: 'Business',
        color: 'text-violet-600 dark:text-violet-400',
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        border: 'border-l-violet-500'
    },
    hybrid: {
        label: 'Hybrid',
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-l-emerald-500'
    },
};

function formatDateRange(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
    };

    return `${formatDate(start)} - ${end ? formatDate(end) : 'Presente'}`;
}

function calculateDuration(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) return `${remainingMonths} meses`;
    if (remainingMonths === 0) return `${years} año${years > 1 ? 's' : ''}`;
    return `${years}a ${remainingMonths}m`;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, onOpenCertificates }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    const typeInfo = typeConfig[experience.type];

    return (
        <div
            ref={ref}
            className={`
        group relative bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl
        transition-all duration-700 border border-slate-100 dark:border-slate-700 border-l-4 ${typeInfo.border}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeInfo.bg} ${typeInfo.color}`}>
                            {typeInfo.label}
                        </span>
                        {!experience.endDate && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                Actual
                            </span>
                        )}
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            {calculateDuration(experience.startDate, experience.endDate)}
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">
                        {experience.role}
                    </h3>
                    <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                        {experience.company}
                    </p>
                </div>
                <div className="flex-shrink-0 text-left md:text-right">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {formatDateRange(experience.startDate, experience.endDate)}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                {experience.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-5">
                {experience.technologies.map((tech, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Achievements */}
            <div className="mb-5">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs">✓</span>
                    Logros Clave
                </h4>
                <ul className="space-y-2">
                    {experience.achievements.slice(0, isExpanded ? undefined : 2).map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                        </li>
                    ))}
                </ul>
                {experience.achievements.length > 2 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                        {isExpanded ? '← Ver menos' : `Ver ${experience.achievements.length - 2} logros más →`}
                    </button>
                )}
            </div>

            {/* KPIs & Actions */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-6 items-center justify-between">

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                    {experience.kpis?.map((kpi, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {kpi.value}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {kpi.label}
                            </div>
                            {kpi.improvement && (
                                <div className="text-xs font-semibold text-emerald-500 mt-0.5">
                                    {kpi.improvement}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Certificates Button */}
                {experience.certificates && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenCertificates();
                        }}
                        className="w-full md:w-auto px-5 py-2.5 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-xl font-medium text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 relative z-10"
                    >
                        <span className="text-lg">📜</span> Ver Certificados
                    </button>
                )}
            </div>
        </div>
    );
};
