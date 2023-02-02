import { getCoinList } from "@/api/getCoinList";
import axios from "axios";
import { coinList, coinData } from "@/interface/interface";

export const getCoinData = async () => {
  let url = await getCoinList();

  const map = new Map();
  url.forEach((item: coinList) => map.set(item.market, item));

  url = url.map((el: coinList) => el.market).join();

  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
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
