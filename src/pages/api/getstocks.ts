import type { NextApiRequest, NextApiResponse } from "next";
import { NseIndia } from "stock-nse-india";
const nse = new NseIndia();

export const config = {
  runtime: "nodejs",
};
type SuccessResponse = any; 
type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const symbol = req.body?.symbol;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Missing or invalid symbol" });
  }

  try {
    const availableSymbols = await nse.getAllStockSymbols();
    console.log("Available symbols:", availableSymbols);
    const isValidSymbol = availableSymbols.some(
      (stock) => stock.trim().toUpperCase() === symbol.trim().toUpperCase()
    );

    if (!isValidSymbol) {
      return res
        .status(400)
        .json({ error: "Invalid stock symbol or it doesn't belong to NSE." });
    }
    console.log("Valid symbol:", symbol);

    const data = await nse.getEquityDetails(symbol);
    console.log("Fetched data:", data);
    return res.status(200).json(data);
  } catch (e) {
    console.error("API Error:", e);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
