import React, { useState, useEffect, useMemo } from 'react';
import { Currency, Rates, ApiSource } from './types';
import { fetchExchangeRates } from './services/currencyService';
import Header from './components/Header';
import CurrencyInput from './components/CurrencyInput';
import ResultCard from './components/ResultCard';
import RateComparison from './components/RateComparison';
import Loader from './components/Loader';
import ApiSelector from './components/ApiSelector';
import WiseApiKeyInput from './components/WiseApiKeyInput';
import IncentiveSettings from './components/IncentiveSettings';

const App: React.FC = () => {
    const [amount, setAmount] = useState<string>('100');
    const [inputCurrency, setInputCurrency] = useState<Currency>(Currency.GBP);
    const [apiSource, setApiSource] = useState<ApiSource>(ApiSource.EXCHANGE_RATE_API);
    const [wiseApiKey, setWiseApiKey] = useState<string>(() => localStorage.getItem('wiseApiKey') || '');
    const [rates, setRates] = useState<Rates | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [incentiveEnabled, setIncentiveEnabled] = useState<boolean>(true);
    const [incentiveRate, setIncentiveRate] = useState<string>('2.5');

    // Persist the Wise API key to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('wiseApiKey', wiseApiKey);
    }, [wiseApiKey]);

    useEffect(() => {
        // When Wise is selected but there's no key, it's not an error,
        // but a state where we are waiting for user input.
        if (apiSource === ApiSource.WISE && !wiseApiKey) {
            setIsLoading(false);
            setError('A Wise API key is required to fetch rates.');
            setRates(null); // Clear any previous rates
            return;
        }

        const getRates = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedRates = await fetchExchangeRates(apiSource, wiseApiKey);
                setRates(fetchedRates);
            } catch (err) {
                 if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(`An unexpected error occurred.`);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getRates();
    }, [apiSource, wiseApiKey]);

    const { conversionResults, marketMyrBdtRate } = useMemo(() => {
        const numericAmount = parseFloat(amount);
        if (!rates || !numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
            return {
                conversionResults: {
                    otherCurrency: inputCurrency === Currency.GBP ? Currency.MYR : Currency.GBP,
                    otherCurrencyAmount: 0,
                    bdtWithIncentive: 0,
                    calculatedMyrBdtRate: 0,
                },
                marketMyrBdtRate: 0,
            };
        }

        let gbpAmount = 0;
        let myrAmount = 0;

        if (inputCurrency === Currency.GBP) {
            gbpAmount = numericAmount;
            myrAmount = gbpAmount * rates.GBP_TO_MYR;
        } else {
            myrAmount = numericAmount;
            gbpAmount = myrAmount / rates.GBP_TO_MYR;
        }

        const bdtAmount = gbpAmount * rates.GBP_TO_BDT;
        
        const incentivePercentage = incentiveEnabled ? parseFloat(incentiveRate) / 100 : 0;
        const validIncentive = !isNaN(incentivePercentage) && incentivePercentage > 0;
        const bdtWithIncentive = bdtAmount * (1 + (validIncentive ? incentivePercentage : 0));

        const calculatedMyrBdtRate = myrAmount > 0 ? bdtWithIncentive / myrAmount : 0;
        
        const otherCurrency = inputCurrency === Currency.GBP ? Currency.MYR : Currency.GBP;
        const otherCurrencyAmount = otherCurrency === Currency.MYR ? myrAmount : gbpAmount;

        const marketRate = rates.MYR_TO_BDT || (rates.GBP_TO_BDT / rates.GBP_TO_MYR);

        return {
            conversionResults: {
                otherCurrency,
                otherCurrencyAmount,
                bdtWithIncentive,
                calculatedMyrBdtRate,
            },
            marketMyrBdtRate: marketRate,
        };
    }, [amount, inputCurrency, rates, incentiveEnabled, incentiveRate]);

    const formatCurrency = (value: number, currency: Currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const incentiveDisplayRate = parseFloat(incentiveRate);
    const bdtCardTitle = incentiveEnabled && !isNaN(incentiveDisplayRate) && incentiveDisplayRate > 0
        ? `Converted to BDT (inc. ${incentiveDisplayRate}%)`
        : "Converted to BDT";

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-lg mx-auto">
                <Header />

                <main className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
                     <div className="space-y-6">
                        <CurrencyInput
                            amount={amount}
                            setAmount={setAmount}
                            selectedCurrency={inputCurrency}
                            setSelectedCurrency={setInputCurrency}
                        />

                        <IncentiveSettings
                            isEnabled={incentiveEnabled}
                            setIsEnabled={setIncentiveEnabled}
                            rate={incentiveRate}
                            setRate={setIncentiveRate}
                            disabled={isLoading}
                        />

                        <ApiSelector
                            selectedSource={apiSource}
                            setSource={setApiSource}
                            disabled={isLoading}
                        />

                        {apiSource === ApiSource.WISE && (
                            <WiseApiKeyInput
                                apiKey={wiseApiKey}
                                setApiKey={setWiseApiKey}
                                disabled={isLoading}
                            />
                        )}
                        
                        {isLoading ? (
                            <div className="flex justify-center items-center h-48">
                                <Loader />
                            </div>
                        ) : error ? (
                             <div className="text-center text-yellow-400 p-4 bg-yellow-900/20 rounded-lg">
                                <p>{error}</p>
                            </div>
                        ) : rates && (
                            <>
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">Conversion Results</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ResultCard
                                            title={`Converted to ${conversionResults.otherCurrency}`}
                                            amount={formatCurrency(conversionResults.otherCurrencyAmount, conversionResults.otherCurrency)}
                                            currency={conversionResults.otherCurrency}
                                        />
                                        <ResultCard
                                            title={bdtCardTitle}
                                            amount={formatCurrency(conversionResults.bdtWithIncentive, Currency.BDT)}
                                            currency={Currency.BDT}
                                            highlight
                                        />
                                    </div>
                                </div>
                                
                                <RateComparison
                                    marketRate={marketMyrBdtRate}
                                    calculatedRate={conversionResults.calculatedMyrBdtRate}
                                />
                            </>
                        )}
                    </div>
                </main>
                 <footer className="text-center mt-8 text-gray-500 text-sm">
                    <p>
                        Rates via <span className="text-cyan-400">{apiSource}</span>.
                    </p>
                    <p>&copy; {new Date().getFullYear()} Viable Rate Calculator. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;