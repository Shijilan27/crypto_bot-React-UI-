import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <svg
              className="h-8 w-8 text-yellow-400"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Binance Logo"
              role="img"
            >
              <path d="M12 8.333l1.778 1.778L12 11.889l-1.778-1.778L12 8.333zm3.556-3.555l1.777 1.777-3.555 3.556-1.778-1.778 3.556-3.555zm-7.112 0l3.556 3.555-1.778 1.778-3.555-3.556L8.444 4.778zM12 15.667l-1.778-1.778L12 12.111l1.778 1.778L12 15.667zm-3.556 3.555l-1.777-1.777 3.555-3.556 1.778 1.778-3.556 3.555zm7.112 0l-3.556-3.555 1.778-1.778 3.555 3.556-1.777 1.777zM2.889 12l1.777-1.778L6.444 12l-1.778 1.778L2.889 12zm18.222 0l-1.777 1.778-1.778-1.777 1.778-1.778 1.777 1.778zM12 0l1.778 1.778L12 3.556 10.222 1.778 12 0zm0 24l-1.778-1.778L12 20.444l1.778 1.778L12 24z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-100">
              Crypto Trade bot UI
            </h1>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-500/20 text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Binance Futures Testnet
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;