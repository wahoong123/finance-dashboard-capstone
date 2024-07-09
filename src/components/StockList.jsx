import React from 'react';

function StockList({ stocks }) {
  return (
    <div className='dark:text-white'>
      {/* 头 */}
      <h2 className="text-xl font-semibold mb-4 text-left">Stock List</h2>
      {stocks.length === 0 ? (
        <p className="text-left">No stocks added yet.</p>
      ) : (
        <ul className="space-y-4">
          {/* 把股票信息放在这里 */}
          {stocks.map((stock, index) => {
            const profitLoss = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
            return (
              <li key={index} className="p-4 border rounded-lg shadow">
                <div className="text-left">
                  <p><strong>Symbol:</strong> {stock.symbol}</p>
                  <p><strong>Quantity:</strong> {stock.quantity}</p>
                  <p><strong>Purchase Price:</strong> {stock.purchasePrice.toFixed(2)}</p>
                  <p><strong>Current Price:</strong> {stock.currentPrice.toFixed(2)}</p>
                  <p
                    className={`font-bold ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    Profit/Loss: {profitLoss.toFixed(2)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default StockList;
