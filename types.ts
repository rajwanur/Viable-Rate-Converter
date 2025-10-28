export enum Currency {
    GBP = 'GBP',
    MYR = 'MYR',
    BDT = 'BDT',
}

export enum ApiSource {
    EXCHANGE_RATE_API = 'ExchangeRate-API',
    WISE = 'Wise',
}

export interface Rates {
    GBP_TO_MYR: number;
    GBP_TO_BDT: number;
    MYR_TO_BDT?: number; // Direct market rate, if available from the source
}