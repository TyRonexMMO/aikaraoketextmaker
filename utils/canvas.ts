
import { type StyleConfig } from '../types';
import { PREVIEW_HEIGHT } from '../constants';

export function drawTextToCanvas(canvas: HTMLCanvasElement, text: string, config: StyleConfig, height: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const safeText = text ? text.trim() : "";
    if (!safeText) {
        canvas.width = 1;
        canvas.height = height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    // FONT SIZE CALCULATION (Absolute Pixel Height)
    const fontSize = height * (config.size / 100);

    // Measure Text Width
    ctx.font = `bold ${fontSize}px "${config.font}"`;
    const textMetrics = ctx.measureText(safeText);

    // Width expands as needed.
    const padding = Math.max(config.strokeWidth * 4, height * 0.2);
    const width = Math.ceil(textMetrics.width + (padding * 2));
    
    canvas.width = width;
    canvas.height = height;

    // For preview, ensure the style reflects an auto width
    if (height === PREVIEW_HEIGHT) {
        canvas.style.height = `${PREVIEW_HEIGHT}px`;
        canvas.style.width = 'auto';
    }

    // Clear & Style
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${fontSize}px "${config.font}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + (height * 0.05);

    // Draw Stroke
    if (config.strokeWidth > 0) {
        const scaleFactor = height / 150;
        ctx.lineWidth = config.strokeWidth * scaleFactor;
        ctx.strokeStyle = config.strokeColor;
        ctx.strokeText(safeText, centerX, centerY);
    }

    // Draw Fill
    ctx.fillStyle = config.color;
    ctx.fillText(safeText, centerX, centerY);
}
