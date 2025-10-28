import { Rates, ApiSource } from '../types';

/**
 * Fetches rates from exchangerate-api.com.
 */
const fetchFromExchangeRateApi = async (): Promise<Rates> => {
    const API_URL = 'https://open.er-api.com/v6/latest/GBP';
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.result === 'error') {
        throw new Error(data['error-type'] || 'API returned an error');
    }

    const rates = data.rates;
    if (!rates || !rates.MYR || !rates.BDT) {
        throw new Error('Required currency rates (MYR, BDT) not found in API response.');
    }

    return {
        GBP_TO_MYR: rates.MYR,
        GBP_TO_BDT: rates.BDT,
    };
};

/**
 * Fetches rates from Wise's official API using an API key.
 * The unreliable public fallback has been removed.
 * @param apiKey - The user's Wise API key (required).
 */
const fetchFromWiseApi = async (apiKey?: string): Promise<Rates> => {
    // An API key is now required. Throw an error if it's missing.
    if (!apiKey) {
        throw new Error('A Wise API key is required. Please enter your key to fetch rates from Wise.');
    }

    const fetchRateWithKey = async (source: string, target: string) => {
        const API_URL = `https://api.wise.com/v1/rates?source=${source}&target=${target}`;
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error(`Wise API authentication error (${response.status}): Please check your API key.`);
        }
        if (!response.ok) {
            throw new Error(`Wise API error for ${source}->${target}: ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0 || typeof data[0].rate !== 'number') {
            throw new Error(`Invalid data structure from Wise API for ${source}->${target}`);
        }
        return data[0].rate;
    };

    const [gbpToMyr, gbpToBdt, myrToBdt] = await Promise.all([
        fetchRateWithKey('GBP', 'MYR'),
        fetchRateWithKey('GBP', 'BDT'),
        fetchRateWithKey('MYR', 'BDT'),
    ]);

    return {
        GBP_TO_MYR: gbpToMyr,
        GBP_TO_BDT: gbpToBdt,
        MYR_TO_BDT: myrToBdt,
    };
};


/**
 * Fetches the latest exchange rates from the selected provider.
 * @param source The API source to use (e.g., ApiSource.WISE).
 * @param wiseApiKey An optional API key for the Wise provider.
 * @returns A promise that resolves to the rates for MYR and BDT.
 */
export const fetchExchangeRates = async (source: ApiSource, wiseApiKey?: string): Promise<Rates> => {
    try {
        if (source === ApiSource.WISE) {
            return await fetchFromWiseApi(wiseApiKey);
        }
        // Default to ExchangeRate-API
        return await fetchFromExchangeRateApi();
    } catch (error) {
        console.error(`Failed to fetch exchange rates from ${source}:`, error);
        if (error instanceof Error) {
            if (error.message === 'Failed to fetch') {
                 throw new Error(`Network error while fetching from ${source}. Please check your connection.`);
            }
            throw error;
        }
        throw new Error(`An unknown error occurred while fetching from ${source}.`);
    }
};