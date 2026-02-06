import React from 'react';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    certificates: string[];
    title: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, certificates, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-scale-up relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 pr-8">
                    Certificados - {title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-[4/3]">
                            <img
                                src={cert}
                                alt={`Certificate ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <a href={cert} target="_blank" rel="noreferrer" className="text-white text-sm font-medium hover:underline">
                                    Ver pantalla completa ↗
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {certificates.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <p>No hay certificados disponibles para esta experiencia.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
