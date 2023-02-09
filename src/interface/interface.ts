export interface coinData {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: string;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export interface coinList {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface IsearchedList {
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  change: string;
  change_price: number;
  change_rate: number;
  english_name: string;
  high_price: number;
  highest_52_week_date: string;
  highest_52_week_price: number;
  korean_name: string;
  low_price: number;
  lowest_52_week_date: string;
  lowest_52_week_price: number;
  market: string;
  opening_price: number;
  prev_closing_price: number;
  signed_change_price: number;
  signed_change_rate: number;
  timestamp: number;
  trade_date: string;
  trade_date_kst: string;
  trade_price: number;
  trade_time: string;
  trade_time_kst: string;
  trade_timestamp: number;
  trade_volume: number;
}
