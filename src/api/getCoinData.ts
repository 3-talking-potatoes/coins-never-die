import axios from "axios";
import { coinList, coinData } from "@/interface/interface";

export const getCoinData = async () => {
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const responseName = await axios.get(
      "https://api.upbit.com/v1/market/all?isDetails=false",
      options,
    );
    let url = responseName.data.filter((el: coinList) =>
      el.market.includes("KRW"),
    );

    const map = new Map();
    url.forEach((item: coinList) => map.set(item.market, item));
    url = url.map((el: coinList) => el.market).join();

    const response = await axios.get(
      `https://api.upbit.com/v1/ticker?markets=${url}`,
      options,
    );

    response.data.forEach((item: coinData) =>
      map.set(item.market, { ...map.get(item.market), ...item }),
    );
    const coins = Array.from(map.values());

    return coins;
  } catch (err) {
    console.log(err);
  }
};
