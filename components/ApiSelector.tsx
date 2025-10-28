import React from 'react';
import { ApiSource } from '../types';

interface ApiSelectorProps {
    selectedSource: ApiSource;
    setSource: (source: ApiSource) => void;
    disabled: boolean;
}

const ApiSelector: React.FC<ApiSelectorProps> = ({ selectedSource, setSource, disabled }) => {
    const sources = Object.values(ApiSource);

    return (
        <div className="pt-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
                Data Source
            </label>
            <div className="flex bg-gray-700 rounded-lg p-1 space-x-1">
                {sources.map((source) => (
                    <button
                        key={source}
                        onClick={() => setSource(source)}
                        disabled={disabled}
                        className={`w-full px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
                            selectedSource === source
                                ? 'bg-cyan-500 text-white shadow'
                                : 'text-gray-300 hover:bg-gray-600'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {source}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ApiSelector;