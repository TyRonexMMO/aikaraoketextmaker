
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ControlsSection } from './components/ControlsSection';
import { PreviewSection } from './components/PreviewSection';
import { ActionButtons } from './components/ActionButtons';
import { Footer } from './components/Footer';
import { type StyleConfig } from './types';
import { downloadCombinedImage, downloadAllAsZip } from './utils/download';

const INITIAL_TEXT = "សួស្តីកម្ពុជា\nស្វាគមន៍\nឆ្នាំថ្មី";

const initialStyleTop: StyleConfig = {
    font: 'Kantumruy Pro',
    size: 60,
    color: '#2563eb',
    strokeColor: '#ffffff',
    strokeWidth: 4,
};

const initialStyleBottom: StyleConfig = {
    font: 'Kantumruy Pro',
    size: 60,
    color: '#e11d48',
    strokeColor: '#ffffff',
    strokeWidth: 4,
};

const App: React.FC = () => {
    const [text, setText] = useState<string>(INITIAL_TEXT);
    const [lines, setLines] = useState<string[]>(INITIAL_TEXT.split('\n'));
    const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
    
    const [styleTop, setStyleTop] = useState<StyleConfig>(initialStyleTop);
    const [styleBottom, setStyleBottom] = useState<StyleConfig>(initialStyleBottom);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });

    useEffect(() => {
        const newLines = text.split('\n');
        setLines(newLines);
        if (currentLineIndex >= newLines.length) {
            setCurrentLineIndex(Math.max(0, newLines.length - 1));
        }
    }, [text, currentLineIndex]);

    const handleDownloadCurrent = useCallback(() => {
        const lineText = lines[currentLineIndex] || '';
        if (lineText.trim()) {
            downloadCombinedImage(lineText, styleTop, styleBottom, `khmer-design-line-${currentLineIndex + 1}.png`);
        }
    }, [currentLineIndex, lines, styleTop, styleBottom]);

    const handleDownloadZip = useCallback(async () => {
        setIsProcessing(true);
        await downloadAllAsZip(lines, styleTop, styleBottom, (p) => setProgress(p));
        setIsProcessing(false);
    }, [lines, styleTop, styleBottom]);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-6 gap-6 flex flex-col">
                <InputSection
                    text={text}
                    onTextChange={setText}
                    lineCount={lines.length}
                />
                <ControlsSection
                    styleTop={styleTop}
                    setStyleTop={setStyleTop}
                    styleBottom={styleBottom}
                    setStyleBottom={setStyleBottom}
                />
                <PreviewSection
                    lines={lines}
                    currentLineIndex={currentLineIndex}
                    setCurrentLineIndex={setCurrentLineIndex}
                    styleTop={styleTop}
                    styleBottom={styleBottom}
                />
                <ActionButtons
                    onDownloadCurrent={handleDownloadCurrent}
                    onDownloadZip={handleDownloadZip}
                    isProcessing={isProcessing}
                    progress={progress}
                    totalLines={lines.length}
                />
            </main>
            <Footer />
        </div>
    );
};

export default App;
