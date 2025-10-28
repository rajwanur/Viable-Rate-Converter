# Viable Rate Currency Converter

A powerful web application for calculating minimum viable rates for multi-currency conversion, specifically designed for transactions between GBP (British Pound), MYR (Malaysian Ringgit), and BDT (Bangladeshi Taka) with government incentive calculations.

## 🌟 Features

- **Multi-Currency Conversion**: Convert between GBP, MYR, and BDT with real-time exchange rates
- **Government Incentive Calculation**: Automatically adds 2.5% (customizable) government incentive when converting to BDT
- **Dual API Support**: Fetch rates from either Wise API or ExchangeRate-API
- **Rate Comparison**: Compare current market MYR/BDT rate vs calculated rate with incentives
- **Secure API Key Management**: Securely store Wise API keys locally
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Fetch latest exchange rates on demand

## Screenshots

![Homepage](screenshot\homepage-default.png)
![Homepage with wise as data source](screenshot\homepage-wise.png)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Optional: Wise API key for accessing Wise exchange rates

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajwanur/Viable-Rate-Converter.git
cd Viable-Rate-Converter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 💡 How It Works

### Conversion Process

1. **Input**: Enter amount in either GBP or MYR
2. **Currency Translation**: Automatically convert to the other currency (MYR or GBP)
3. **BDT Calculation**: Convert to BDT with optional government incentive (default 2.5%)
4. **Rate Comparison**: Compare the calculated MYR/BDT rate against current market rates

### Government Incentive

When converting to BDT, the application adds a government incentive percentage to help users determine the minimum viable rate:
- Default incentive: 2.5%
- Customizable through the settings
- Can be enabled/disabled as needed

### Rate Sources

The application supports two rate sources:

#### Wise API (Recommended)
- Requires a Wise API key
- Provides more accurate, real-time rates
- Direct integration with Wise's official rates

#### ExchangeRate-API
- Free alternative (no API key required)
- Updated hourly
- Good for general estimates

## 🛠️ Usage Guide

### Basic Conversion

1. Enter the amount you want to convert
2. Select the input currency (GBP or MYR)
3. The app automatically shows:
   - Converted amount in the other currency
   - BDT amount with incentive applied
   - Rate comparison chart

### Using Wise API

1. Click on API Source selector and choose "Wise"
2. Enter your Wise API key when prompted
3. The key will be securely stored locally for future use

### Customizing Incentive

1. Toggle the incentive setting on/off
2. Adjust the incentive percentage as needed
3. Changes are reflected immediately in calculations

## 🏗️ Technical Architecture

### Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (utility-first)
- **State Management**: React Hooks (useState, useEffect, useMemo)

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. However, for production deployment:

- Create a `.env.local` file for local development
- Store any sensitive configuration there

### API Rate Limits

- **ExchangeRate-API**: Free tier with hourly updates
- **Wise API**: Requires authentication, rate limits depend on your Wise account

## 🌐 API Integration

### Wise API Setup

1. Sign up for a Wise account
2. Generate an API key from your Wise dashboard
3. Enter the key in the application's Wise API input field
4. The key will be stored securely in localStorage

### ExchangeRate-API

- Used as fallback when Wise API key is not provided
- Public endpoint: `https://open.er-api.com/v6/latest/GBP`
- No authentication required

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security Considerations

- Wise API keys are stored in localStorage (browser local storage only)
- No server-side storage of sensitive information
- API calls made directly from client-side
- Consider additional security measures for production deployments

---

*Built with ❤️ for seamless currency conversion*
