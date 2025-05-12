
import { NseIndia } from 'stock-nse-india';
const nse = new NseIndia();


export default async function handler(req, res) {
  const { symbol } = req.body;
  try{
    const availableSymbols = await nse.getAllStockSymbols();
    res.status(200).json(availableSymbols);
  }catch(e){
    res.status(500).json({ error: "Failed to fetch symbols" });
  }
}