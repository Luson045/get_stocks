import type { NextApiRequest, NextApiResponse } from "next";
//import { NseIndia } from "stock-nse-india";
//const nse = new NseIndia();

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
  const { symbol } = req.body;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Missing or invalid symbol" });
  }

  try {
    // const availableSymbols = "hello"//await nse.getAllStockSymbols();

    // const isValidSymbol = availableSymbols.some(
    //   (stock) => stock.trim().toUpperCase() === symbol.trim().toUpperCase()
    // );

    // if (!isValidSymbol) {
    //   return res
    //     .status(400)
    //     .json({ error: "Invalid stock symbol or it doesn't belong to NSE." });
    // }

    const data = "hello" //await nse.getEquityDetails(symbol);
    return res.status(200).json(data);
  } catch (e) {
    console.error("API Error:", e);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
