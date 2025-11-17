
import React from 'react';
import { type StyleConfig } from '../types';
import { FONT_OPTIONS } from '../constants';

interface StyleControlsProps {
    title: string;
    accentClass: string;
    config: StyleConfig;
    setConfig: React.Dispatch<React.SetStateAction<StyleConfig>>;
}

const StyleControls: React.FC<StyleControlsProps> = ({ title, accentClass, config, setConfig }) => {
    const handleConfigChange = <K extends keyof StyleConfig>(key: K, value: StyleConfig[K]) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${accentClass}`}>
            <h2 className={`text-xl font-bold ${accentClass.replace('border-', 'text-').slice(0, -2)}-600 mb-4 border-b pb-2`}>{title}</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">ជ្រើសរើសហ្វុង (Font)</label>
                    <select
                        value={config.font}
                        onChange={(e) => handleConfigChange('font', e.target.value)}
                        className="w-full p-2 border rounded-lg bg-gray-50"
                    >
                        {FONT_OPTIONS.map(font => (
                            <option key={font.value} value={font.value} style={{ fontFamily: `'${font.value}'` }}>
                                {font.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1 flex justify-between">
                        <span>ទំហំអក្សរ (Font Size)</span>
                        <span className={`${accentClass.replace('border-', 'text-').slice(0, -2)}-600 font-bold`}>{config.size}%</span>
                    </label>
                    <input type="range" min="20" max="150" value={config.size} onChange={(e) => handleConfigChange('size', parseInt(e.target.value))} className={`w-full ${accentClass.replace('border-','accent-').slice(0, -2)}-500`} />
                </div>
                <div className="flex gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">ពណ៌អក្សរ</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={config.color} onChange={(e) => handleConfigChange('color', e.target.value)} />
                            <span className="text-xs text-gray-400 font-mono">{config.color}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">ពណ៌គែម (Stroke)</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={config.strokeColor} onChange={(e) => handleConfigChange('strokeColor', e.target.value)} />
                            <span className="text-xs text-gray-400 font-mono">{config.strokeColor}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">កម្រាស់គែម (Stroke Width): <span>{config.strokeWidth}</span>px</label>
                    <input type="range" min="0" max="20" value={config.strokeWidth} onChange={(e) => handleConfigChange('strokeWidth', parseInt(e.target.value))} className={`w-full ${accentClass.replace('border-','accent-').slice(0, -2)}-500`} />
                </div>
            </div>
        </div>
    );
};

interface ControlsSectionProps {
    styleTop: StyleConfig;
    setStyleTop: React.Dispatch<React.SetStateAction<StyleConfig>>;
    styleBottom: StyleConfig;
    setStyleBottom: React.Dispatch<React.SetStateAction<StyleConfig>>;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({ styleTop, setStyleTop, styleBottom, setStyleBottom }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StyleControls title="រចនាប័ទ្មទី ១ (ខាងលើ)" accentClass="border-blue-500" config={styleTop} setConfig={setStyleTop} />
            <StyleControls title="រចនាប័ទ្មទី ២ (ខាងក្រោម)" accentClass="border-rose-500" config={styleBottom} setConfig={setStyleBottom} />
        </div>
    );
};
