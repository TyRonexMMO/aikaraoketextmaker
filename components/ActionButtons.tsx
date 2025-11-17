import React from 'react';

interface ActionButtonsProps {
    onDownloadCurrent: () => void;
    onDownloadZip: () => void;
    isProcessing: boolean;
    progress: { current: number; total: number };
    totalLines: number;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onDownloadCurrent, onDownloadZip, isProcessing, progress, totalLines }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto pt-6 border-t">
            <div className="md:col-span-2 mb-2">
                <p className="text-gray-600 text-sm italic text-center">
                    * គន្លឹះ៖ រូបភាពមានកម្ពស់ 2160px (4K UHD)។ ពេលដាក់ចូលកម្មវិធីកាត់ត សូមកុំប្រើ "Scale to Fit Width" ប្រសិនបើអក្សរវែង។ សូមប្រើ "Scale to Fit Height" ឬដាក់ទំហំ 100%។
                </p>
            </div>
            <button 
                onClick={onDownloadCurrent} 
                disabled={isProcessing}
                className="group flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <div className="text-left">
                    <span className="block text-sm font-normal opacity-80">Current View Only</span>
                    <span className="text-lg">ទាញយកជួរនេះ (1 Image)</span>
                </div>
            </button>

            <button 
                onClick={onDownloadZip} 
                disabled={isProcessing}
                className="group flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:bg-teal-400 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isProcessing ? (
                    <span className="text-white">Processing... {progress.current}/{progress.total}</span>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <div className="text-left">
                            <span className="block text-sm font-normal opacity-80">Process All Lines</span>
                            <span className="text-lg">ទាញយក ZIP ({totalLines} ជួរ)</span>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};