import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Viable Rate Converter
            </h1>
            <p className="mt-3 text-lg text-gray-400 max-w-md mx-auto">
                Calculate minimum viable currency conversion rates including extra costs and incentives.
            </p>
        </header>
    );
};

export default Header;
