'use client';

import React, { useState, useCallback } from 'react';

export const DownloadCVButton: React.FC = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = useCallback(async () => {
        setIsGenerating(true);
        try {
            const { pdf } = await import('@react-pdf/renderer');
            const { CVDocument } = await import('./CVDocument');
            const { portfolioData } = await import('@/infrastructure/config/portfolio-data');

            // Convert profile image to base64 for PDF compatibility
            let avatarBase64: string | undefined;
            try {
                const response = await fetch(portfolioData.profile.avatarUrl);
                const blob = await response.blob();
                avatarBase64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
            } catch {
                // Proceed without image if fetch fails
            }

            const pdfBlob = await pdf(
                React.createElement(CVDocument, { data: portfolioData, avatarBase64 }) as any
            ).toBlob();

            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'CV_Gustavo_Marquez.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return (
        <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:cursor-wait text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isGenerating ? 'Generando...' : 'Descargar CV'}
        </button>
    );
};
