import React from 'react';

interface ResultCardProps {
    title: string;
    amount: string;
    currency: string;
    highlight?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, amount, currency, highlight = false }) => {
    return (
        <div className={`p-4 rounded-lg ${highlight ? 'bg-cyan-900/50 border border-cyan-700' : 'bg-gray-700/50'}`}>
            <p className="text-sm text-gray-400">{title}</p>
            <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-cyan-300' : 'text-white'}`}>
                {amount}
            </p>
        </div>
    );
};

export default ResultCard;
