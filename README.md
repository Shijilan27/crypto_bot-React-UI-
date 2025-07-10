# Crypto Trade Bot UI

A modern web interface for trading on the Binance Futures Testnet.

## Features

- **Derivatives Trading Panel**: Quick access to different Binance derivatives markets (USDⓈ-M, COIN-M, Vanilla Options, and a highlighted Futures Algo).
- **Market Data Panel**: View real-time market data and connect via WebSocket to Binance for live updates.
- **Trading Terminal**:
  - **Order Form**: Place Market, Limit, and Stop-Limit orders with adjustable leverage and symbol selection.
  - **Order Log**: See a real-time, filterable table of all your order history, including status (Submitted, Filled, Canceled, Failed), side (Buy/Sell), price, amount, and timestamp.
  - **API Log**: Visual log of all API requests, responses, and errors, including method, endpoint, timestamp, and data payloads.
- **Notifications**: Get real-time success/error popups for order placement and system events.
- **Modern UI**: Responsive, dark-themed interface with clear separation of trading, data, and logs.


---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd crypto_bot
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **(Optional) Set up environment variables:**
   - If you plan to use Gemini AI features, set `GEMINI_API_KEY` in a `.env.local` file.

### Running the App

- **Development mode:**
  ```sh
  npm run dev
  ```
  The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

- **Production build:**
  ```sh
  npm run build
  npm run preview
  ```
