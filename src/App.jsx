import React, { useState } from "react";
import "./index.css"; // Ensure Tailwind CSS is included

// mah imports
import StockList from "../src/components/StockList.jsx";
import InputField from "../src/components/InputField.jsx"
import ToggleButton from "../src/components/ToggleButton.jsx"
import finance_icon from "../src/assets/finance_icon.png";

function App() {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  const [darkMode, setDarkMode] = useState(false); // State to toggle dark mode

  // Function to handle adding a stock and the API 打电话
  const handleAddStock = () => {
    if (symbol && quantity && price) {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`)
        .then((response) => response.json())
        .then((data) => {
          const globalQuote = data["Global Quote"];
          if (globalQuote && globalQuote["05. price"]) {
            const currentPrice = parseFloat(globalQuote["05. price"]);
            const newStock = {
              symbol,
              quantity: parseFloat(quantity),
              purchasePrice: parseFloat(price),
              currentPrice: currentPrice,
            };
            setStocks([...stocks, newStock]);
            setSymbol("");
            setQuantity("");
            setPrice("");
            setError(null);
          } else {
            console.error("API response does not contain expected data:", data);
            setError("Unable to fetch current price. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error fetching stock price:", error);
          setError("Error fetching stock price. Please check the symbol and try again.");
        });
    }
  };

  // 深色 / 浅色模式 method
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${darkMode ? 'dark bg-gray-800' : 'bg-white'}`}>
      <div className="w-full max-w-2xl">
        <img src={finance_icon} alt="Finance Icon" className="w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-left dark:text-white">Finance Dashboard</h1>
        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex space-x-4">
            {/* 我的inputs */}
            <InputField
              type="text"
              placeholder="Stock Symbol"
              value={symbol.toUpperCase()}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="p-2 border-2 rounded w-48 focus:border-[#CCCCFF] outline-none dark:bg-gray-800 dark:border-grey dark:text-white dark:focus:border-[#a3f2bb] dark:outline-none"
            />
            <InputField
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="p-2 border-2 rounded w-48 focus:border-[#CCCCFF] outline-none dark:bg-gray-800 dark:border-grey dark:text-white dark:focus:border-[#a3f2bb] dark:outline-none"
            />
            <InputField
              type="number"
              placeholder="Purchase Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 border-2 rounded w-48 focus:border-[#CCCCFF] outline-none dark:bg-gray-800 dark:border-grey dark:text-white dark:focus:border-[#a3f2bb] dark:outline-none"
            />
            {/* 股票按钮 */}
            <button
              onClick={handleAddStock}
              className="p-2 bg-[#CCCCFF] text-black rounded hover:bg-[#7070FF] hover:text-white w-48 whitespace-nowrap dark:bg-[#baffc9] dark:hover:bg-[#a3f2bb]"
            >
              Add Stock
            </button>
            {/* 深色 / 浅色模式按钮 */}
            <ToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
        {/* 有问题 */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* 我的股票 */}
        <StockList stocks={stocks} />
      </div>
    </div>
  );
};

export default App;