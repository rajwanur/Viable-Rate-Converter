import React from 'react';

interface IncentiveSettingsProps {
    isEnabled: boolean;
    setIsEnabled: (enabled: boolean) => void;
    rate: string;
    setRate: (rate: string) => void;
    disabled: boolean;
}

const IncentiveSettings: React.FC<IncentiveSettingsProps> = ({
    isEnabled,
    setIsEnabled,
    rate,
    setRate,
    disabled
}) => {
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numbers and a single decimal point up to a reasonable length
        if (/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            setRate(value);
        }
    };

    return (
        <div className="pt-4 space-y-4">
            <div className="flex justify-between items-center">
                <label htmlFor="incentive-toggle" className="flex-grow text-sm font-medium text-gray-400 cursor-pointer">
                    BD Government Incentive
                </label>
                <div className="relative inline-block w-10 align-middle select-none">
                    <input
                        type="checkbox"
                        name="incentive-toggle"
                        id="incentive-toggle"
                        checked={isEnabled}
                        onChange={() => setIsEnabled(!isEnabled)}
                        disabled={disabled}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                    />
                    <label htmlFor="incentive-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"></label>
                </div>
            </div>
            
            
                <div className="pl-1">
                     <label htmlFor="incentive-rate" className="sr-only">
                        Incentive Rate (%)
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="incentive-rate"
                            value={rate}
                            onChange={handleRateChange}
                            disabled={disabled || !isEnabled}
                            className="w-full pl-4 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 disabled:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="e.g., 2.5"
                        />
                         <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <span className="text-gray-400">%</span>
                        </div>
                    </div>
                </div>
            
            
            {/* Simple CSS-in-JS for the toggle switch */}
            <style>{`
                .toggle-checkbox {
                    left: -0.25rem;
                }
                .toggle-checkbox:checked {
                    transform: translateX(100%);
                    border-color: #06b6d4; /* Tailwind cyan-500 */
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #06b6d4; /* Tailwind cyan-500 */
                }
            `}</style>
        </div>
    );
};

export default IncentiveSettings;