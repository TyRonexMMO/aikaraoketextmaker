
import React, { useRef, useEffect } from 'react';
import { type StyleConfig } from '../types';
import { PREVIEW_HEIGHT } from '../constants';
import { drawTextToCanvas } from '../utils/canvas';

interface PreviewSectionProps {
    lines: string[];
    currentLineIndex: number;
    setCurrentLineIndex: (index: number) => void;
    styleTop: StyleConfig;
    styleBottom: StyleConfig;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ lines, currentLineIndex, setCurrentLineIndex, styleTop, styleBottom }) => {
    const canvasTopRef = useRef<HTMLCanvasElement>(null);
    const canvasBottomRef = useRef<HTMLCanvasElement>(null);

    const currentText = lines[currentLineIndex] || '';

    useEffect(() => {
        const draw = () => {
            if (canvasTopRef.current) {
                drawTextToCanvas(canvasTopRef.current, currentText, styleTop, PREVIEW_HEIGHT);
            }
            if (canvasBottomRef.current) {
                drawTextToCanvas(canvasBottomRef.current, currentText, styleBottom, PREVIEW_HEIGHT);
            }
        };

        // Ensure fonts are loaded before drawing
        document.fonts.ready.then(draw);
        
    }, [currentText, styleTop, styleBottom]);

    const truncatedText = currentText.length > 30 ? `${currentText.substring(0, 30)}...` : (currentText || '(Empty)');

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-600">ជ្រើសរើសជួរដើម្បីមើល (Select Line):</span>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                        Line {currentLineIndex + 1} / {lines.length}
                    </span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={Math.max(0, lines.length - 1)}
                    value={currentLineIndex}
                    onChange={(e) => setCurrentLineIndex(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                    disabled={lines.length <= 1}
                />
                <p className="text-center text-gray-500 text-sm mt-2 truncate italic">{truncatedText}</p>
            </div>

            <div className="flex justify-between items-end mb-4">
                <h3 className="text-lg font-bold text-gray-700">លទ្ធផល (Preview)</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    អក្សរមិនបង្រួម (Fixed Size) - 100% សម្រាប់ការងារ Karaoke
                </span>
            </div>
            
            <div className="w-full overflow-x-auto pb-6 custom-scrollbar text-center bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="checkered-bg inline-block p-8 rounded-lg border border-gray-300 shadow-inner min-w-min">
                    <div className="flex flex-col gap-8 items-center justify-center w-max mx-auto">
                        <canvas ref={canvasTopRef} style={{ height: `${PREVIEW_HEIGHT}px`, width: 'auto', display: 'block' }}></canvas>
                        
                        <div className="w-full h-px bg-gray-300 border-t border-dashed border-gray-400 opacity-50 relative" style={{ minWidth: '200px' }}>
                            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-400">VS</span>
                        </div>
                        
                        <canvas ref={canvasBottomRef} style={{ height: `${PREVIEW_HEIGHT}px`, width: 'auto', display: 'block' }}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};
