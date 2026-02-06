import React, { useState } from 'react';
import { ExperienceCard } from './ExperienceCard';

// Using local interface for now, to match the card and section expectations
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

interface ExperienceCarouselProps {
    experiences: ExperienceData[];
    onOpenCertificates: (experience: ExperienceData) => void;
}

export const ExperienceCarousel: React.FC<ExperienceCarouselProps> = ({ experiences, onOpenCertificates }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sort experiences by start date (descending)
    const sortedExperiences = [...experiences].sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % sortedExperiences.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + sortedExperiences.length) % sortedExperiences.length);
    };

    return (
        <div className="relative">
            {/* Navigation Buttons (Desktop) */}
            <button
                onClick={prevSlide}
                className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform z-10"
                aria-label="Previous experience"
            >
                ←
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform z-10"
                aria-label="Next experience"
            >
                →
            </button>

            {/* Carousel Content */}
            <div className="overflow-hidden min-h-[500px]">
                <div
                    className="transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(0)` }}
                >
                    <div key={currentIndex} className="animate-fadeIn">
                        <ExperienceCard
                            experience={sortedExperiences[currentIndex]}
                            index={0}
                            onOpenCertificates={() => onOpenCertificates(sortedExperiences[currentIndex])}
                        />
                    </div>
                </div>
            </div>

            {/* Controls & Indicators (Mobile + Bottom) */}
            <div className="flex items-center justify-center gap-6 mt-8">
                <button
                    onClick={prevSlide}
                    className="md:hidden w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
                >
                    ←
                </button>

                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-1.5 rounded-full shadow-sm">
                    {currentIndex + 1} / {sortedExperiences.length}
                </span>

                <button
                    onClick={nextSlide}
                    className="md:hidden w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
                >
                    →
                </button>
            </div>
        </div>
    );
};
