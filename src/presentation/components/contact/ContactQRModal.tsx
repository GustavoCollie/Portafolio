import React from 'react';

interface ContactQRModalProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber: string;
}

export const ContactQRModal: React.FC<ContactQRModalProps> = ({ isOpen, onClose, phoneNumber }) => {
    if (!isOpen) return null;

    // Assuming Peru code 51 as per location context
    const fullNumber = `51${phoneNumber}`;
    const whatsappLink = `https://wa.me/${fullNumber}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappLink)}`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-8 shadow-2xl animate-scale-up relative text-center"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    ¡Contáctame!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                    Escanea el QR para escribirme al WhatsApp
                </p>

                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white rounded-xl shadow-md border border-slate-100">
                        <img
                            src={qrUrl}
                            alt="WhatsApp QR Code"
                            className="w-48 h-48"
                        />
                    </div>
                </div>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.99-.47-.149-.718-.149-.247 0-.446.001-.645.001-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306.943.344 1.29.322.254-.017 1.056-.426 1.245-.859.19-.432.19-.801.134-.897z" />
                    </svg>
                    Abrir en WhatsApp Web
                </a>
            </div>
        </div>
    );
};
