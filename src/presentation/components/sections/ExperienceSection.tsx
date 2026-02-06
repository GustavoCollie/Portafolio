import React, { useState } from 'react';
import { useScrollReveal } from '@/presentation/hooks/useScrollReveal';
import { ExperienceCarousel } from '../experience/ExperienceCarousel';
import { CertificateModal } from '../experience/CertificateModal';

type ExperienceType = 'tech' | 'business' | 'hybrid';

interface KPI {
  label: string;
  value: string;
  improvement?: string;
}

interface ExperienceData {
  id: string;
  company: string;
  role: string;
  description: string;
  type: ExperienceType;
  startDate: string;
  endDate: string | null;
  technologies: string[];
  achievements: string[];
  kpis?: KPI[];
  certificates?: string[];
}

interface ExperienceSectionProps {
  experiences: ExperienceData[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificates, setSelectedCertificates] = useState<{ certs: string[], title: string } | null>(null);

  const totalYears = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    return acc + (end.getFullYear() - start.getFullYear());
  }, 0);

  const handleOpenCertificates = (experience: ExperienceData) => {
    setSelectedCertificates({
      certs: experience.certificates || [],
      title: experience.company
    });
    setModalOpen(true);
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-8 lg:px-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-full mb-4">
            Trayectoria
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Experiencia Profesional
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            +{Math.floor(totalYears)} años combinando desarrollo técnico y estrategia de negocios
          </p>
        </div>

        {/* Carousel Component */}
        <ExperienceCarousel
          experiences={experiences}
          onOpenCertificates={handleOpenCertificates}
        />
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificates={selectedCertificates?.certs || []}
        title={selectedCertificates?.title || ''}
      />
    </section>
  );
};

export default ExperienceSection;
