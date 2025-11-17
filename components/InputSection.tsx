
import React from 'react';

interface InputSectionProps {
    text: string;
    onTextChange: (text: string) => void;
    lineCount: number;
}

export const InputSection: React.FC<InputSectionProps> = ({ text, onTextChange, lineCount }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2">
            <label htmlFor="mainInput" className="block text-lg font-bold text-gray-700">បញ្ចូលអត្ថបទរបស់អ្នកទីនេះ (១ជួរ = ១រូបភាព)៖</label>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{lineCount} Lines</span>
        </div>
        <textarea 
            id="mainInput" 
            rows={4} 
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full text-xl p-4 border-2 border-blue-100 rounded-xl focus:border-blue-500 focus:outline-none transition font-['Kantumruy_Pro'] placeholder-gray-300 leading-loose"
            placeholder="វាយអក្សរនៅទីនេះ...
អាចចុះបន្ទាត់បាន
ដើម្បីបង្កើតរូបភាពច្រើន"
        />
    </div>
);
