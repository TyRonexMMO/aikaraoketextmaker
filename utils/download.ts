
import { type StyleConfig } from '../types';
import { drawTextToCanvas } from './canvas';
import { DOWNLOAD_HEIGHT } from '../constants';

const createHighResCanvas = (text: string, config: StyleConfig): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    drawTextToCanvas(canvas, text, config, DOWNLOAD_HEIGHT);
    return canvas;
};

const getBlob = (canvas: HTMLCanvasElement): Promise<Blob | null> => new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

export const downloadCombinedImage = (text: string, styleTop: StyleConfig, styleBottom: StyleConfig, filename: string): void => {
    const canvasTop = createHighResCanvas(text, styleTop);
    const canvasBottom = createHighResCanvas(text, styleBottom);

    const masterCanvas = document.createElement('canvas');
    const spacing = 100;
    const maxWidth = Math.max(canvasTop.width, canvasBottom.width);
    const totalHeight = canvasTop.height + canvasBottom.height + spacing;

    masterCanvas.width = maxWidth;
    masterCanvas.height = totalHeight;

    const ctx = masterCanvas.getContext('2d');
    if (!ctx) return;

    const x1 = (maxWidth - canvasTop.width) / 2;
    ctx.drawImage(canvasTop, x1, 0);
    const x2 = (maxWidth - canvasBottom.width) / 2;
    ctx.drawImage(canvasBottom, x2, canvasTop.height + spacing);

    masterCanvas.toBlob(blob => {
        if (blob) {
            window.saveAs(blob, filename);
        }
    }, 'image/png');
};

export const downloadAllAsZip = async (
    lines: string[],
    styleTop: StyleConfig,
    styleBottom: StyleConfig,
    onProgress: (progress: { current: number; total: number }) => void
): Promise<void> => {
    const zip = new window.JSZip();
    const validLines = lines.filter(line => line.trim());
    onProgress({ current: 0, total: validLines.length });

    for (let i = 0; i < validLines.length; i++) {
        const lineText = validLines[i].trim();
        const lineNum = i + 1;
        
        onProgress({ current: i, total: validLines.length });

        const canvasTop = createHighResCanvas(lineText, styleTop);
        const canvasBottom = createHighResCanvas(lineText, styleBottom);

        const blobTop = await getBlob(canvasTop);
        const blobBottom = await getBlob(canvasBottom);

        if (blobTop) {
            zip.file(`${lineNum}_top_style.png`, blobTop);
        }
        if (blobBottom) {
            zip.file(`${lineNum}_bottom_style.png`, blobBottom);
        }
        
        // Give the browser a moment to breathe
        await new Promise(r => setTimeout(r, 10));
    }
    
    onProgress({ current: validLines.length, total: validLines.length });

    const content = await zip.generateAsync({ type: "blob" });
    window.saveAs(content, "khmer-design-pack-all-lines.zip");
};
