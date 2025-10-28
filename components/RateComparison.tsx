import React from 'react';

interface RateComparisonProps {
    marketRate: number;
    calculatedRate: number;
}

const RateComparison: React.FC<RateComparisonProps> = ({ marketRate, calculatedRate }) => {
    return (
        <div className="mt-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h4 className="text-md font-semibold text-gray-300 mb-3">MYR / BDT Rate Analysis</h4>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Market Rate:</span>
                    <span className="font-mono text-white bg-gray-700 px-2 py-1 rounded">1 MYR = {marketRate.toFixed(4)} BDT</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Your Calculated Viable Rate:</span>
                    <span className="font-mono text-cyan-300 bg-cyan-900/50 px-2 py-1 rounded">1 MYR = {calculatedRate.toFixed(4)} BDT</span>
                </div>
            </div>
        </div>
    );
};

export default RateComparison;
