import React from 'react';

interface WiseApiKeyInputProps {
    apiKey: string;
    setApiKey: (key: string) => void;
    disabled: boolean;
}

const WiseApiKeyInput: React.FC<WiseApiKeyInputProps> = ({ apiKey, setApiKey, disabled }) => {
    return (
        <div className="pt-2">
            <label htmlFor="wise-api-key" className="block text-sm font-medium text-gray-400 mb-2">
                Wise API Key
            </label>
            <div className="relative">
                <input
                    type="password"
                    id="wise-api-key"
                    name="wise-api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={disabled}
                    className="w-full pl-4 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                    placeholder="Enter your Wise API key"
                    autoComplete="off"
                />
                {apiKey && (
                    <button
                        onClick={() => setApiKey('')}
                        disabled={disabled}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white transition-colors duration-200"
                        aria-label="Clear API Key"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
             <p className="text-xs text-gray-500 mt-2">
                Your key is saved securely in your browser's local storage.
            </p>
        </div>
    );
};

export default WiseApiKeyInput;
