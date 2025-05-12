import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  
  const [symbol, setSymbol] = useState<string>("");
  const [stockData, setStockData] = useState<any>(null);  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const getstocks = async (symbol: string) => {
    try{
      const res = await fetch("/api/getstocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symbol })
      });
      const data = await res.json();
      if (res.ok) {
        setStockData(data);
        setError("");
      } else if (res.status === 400){
        setError("Invalid stock symbol or else it doesn't belong to NSE.");
        setStockData(null);
      } else if (res.status === 500){
        setError("Server error: Failed to fetch stock data.");
        setStockData(null);
      } else{
        setError("Unknown error occurred.");
        setStockData(null);
      }
    }catch(err){
      setError("Network error: Unable to fetch data.");
      setStockData(null);
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">STOCK DETAILS FETCHER</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getstocks(symbol);
        }}
        className="flex flex-col items-center gap-4 mb-6"
      >
        <textarea
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter NSE Symbol (e.g., RELIANCE)"
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black text-white"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>
      {loading && (
        <div className="text-center text-blue-600 font-semibold mb-4">Fetching data...</div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
      )}
      {stockData && (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {stockData.info.companyName} ({stockData.info.symbol})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong>Industry:</strong> {stockData.info.industry}</div>
            <div><strong>ISIN:</strong> {stockData.info.isin}</div>
            <div><strong>Listing Date:</strong> {stockData.metadata.listingDate}</div>
            <div><strong>Status:</strong> {stockData.metadata.status}</div>
            <div><strong>Face Value:</strong> ₹{stockData.securityInfo.faceValue}</div>
            <div><strong>Trading Status:</strong> {stockData.securityInfo.tradingStatus}</div>
            <div><strong>Open:</strong> ₹{stockData.priceInfo.open}</div>
            <div><strong>Close:</strong> ₹{stockData.priceInfo.close}</div>
            <div><strong>Previous Close:</strong> ₹{stockData.priceInfo.previousClose}</div>
            <div><strong>Last Price:</strong> ₹{stockData.priceInfo.lastPrice}</div>
            <div><strong>Change:</strong> ₹{stockData.priceInfo.change} ({stockData.priceInfo.pChange.toFixed(2)}%)</div>
            <div><strong>52 Week High:</strong> ₹{stockData.priceInfo.weekHighLow.max}</div>
            <div><strong>52 Week Low:</strong> ₹{stockData.priceInfo.weekHighLow.min}</div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
