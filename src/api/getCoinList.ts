import axios from "axios";
import { coinList } from "@/interface/interface";

export const getCoinList = async () => {
  const options = { method: "GET", headers: { accept: "application/json" } };
  try {
    const response = await axios.get(
      "https://api.upbit.com/v1/market/all?isDetails=false",
      options,
    );
    const krw = response.data.filter((el: coinList) =>
      el.market.includes("KRW"),
    );
    return krw;
  } catch (err) {
    console.log(err);
  }
};
