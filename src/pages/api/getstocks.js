
import { NseIndia } from 'stock-nse-india';
const nse = new NseIndia();


export default async function handler(req, res) {
  const { symbol } = req.body;
  try{
    const availableSymbols = await nse.getAllStockSymbols();
    const isValidSymbol = availableSymbols.some(stock =>
      stock.trim().toUpperCase() === symbol.trim().toUpperCase()
    );
    if (!isValidSymbol) {
      return res.status(400).json({ error: "Invalid stock symbol" });
    }
    const data = await nse.getEquityDetails(symbol);
    res.status(200).json(data);
  }catch(e){
    res.status(500).json({ error: "Failed to fetch data" });
  }
}