'use client'

import { useEffect, useRef } from 'react'

type Props = { widget: string; config: Record<string, unknown>; height?: number | string; className?: string }

export function TradingViewWidget({ widget, config, height = 400, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const key = JSON.stringify(config)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>'
    const s = document.createElement('script')
    s.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widget}.js`
    s.async = true
    s.innerHTML = JSON.stringify({ colorTheme: 'light', isTransparent: true, locale: 'en', width: '100%', height: typeof height === 'number' ? height : '100%', ...config })
    el.appendChild(s)
    return () => { el.innerHTML = '' }
  }, [widget, key, height])

  return <div ref={ref} className={`tradingview-widget-container ${className ?? ''}`} style={{ height }} />
}

const SYMBOLS = {
  stock: [
    { proName: 'NSE:NIFTY', title: 'NIFTY 50' },
    { proName: 'BSE:SENSEX', title: 'SENSEX' },
    { proName: 'NSE:BANKNIFTY', title: 'BANK NIFTY' },
    { proName: 'NSE:RELIANCE', title: 'Reliance' },
    { proName: 'NSE:TCS', title: 'TCS' },
    { proName: 'NSE:HDFCBANK', title: 'HDFC Bank' },
  ],
  forex: [
    { proName: 'FX:EURUSD', title: 'EUR/USD' },
    { proName: 'FX:GBPUSD', title: 'GBP/USD' },
    { proName: 'FX:USDJPY', title: 'USD/JPY' },
    { proName: 'FX_IDC:USDINR', title: 'USD/INR' },
    { proName: 'OANDA:XAUUSD', title: 'Gold' },
  ],
  crypto: [
    { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
    { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
    { proName: 'BINANCE:SOLUSDT', title: 'Solana' },
    { proName: 'BINANCE:XRPUSDT', title: 'XRP' },
    { proName: 'BINANCE:BNBUSDT', title: 'BNB' },
  ],
}

export function MarketOverview({ market }: { market: 'stock' | 'forex' | 'crypto' }) {
  return (
    <TradingViewWidget
      widget="market-quotes"
      height={460}
      config={{
        symbolsGroups: [{ name: market === 'stock' ? 'Indian markets' : market === 'forex' ? 'Currencies & gold' : 'Cryptocurrencies', symbols: SYMBOLS[market].map((s) => ({ name: s.proName, displayName: s.title })) }],
      }}
    />
  )
}

export function InteractiveChart({ symbol, height = 520 }: { symbol: string; height?: number }) {
  return <TradingViewWidget widget="advanced-chart" height={height} config={{ symbol, interval: 'D', timezone: 'Asia/Kolkata', style: '1', allow_symbol_change: true, hide_side_toolbar: true, withdateranges: true, isTransparent: false }} />
}

export function TapeWidget() {
  return (
    <TradingViewWidget
      widget="ticker-tape"
      height={46}
      config={{
        displayMode: 'compact',
        symbols: [
          { proName: 'NSE:NIFTY', title: 'NIFTY 50' },
          { proName: 'BSE:SENSEX', title: 'SENSEX' },
          { proName: 'NSE:BANKNIFTY', title: 'BANK NIFTY' },
          { proName: 'FX:EURUSD', title: 'EUR/USD' },
          { proName: 'FX_IDC:USDINR', title: 'USD/INR' },
          { proName: 'OANDA:XAUUSD', title: 'Gold' },
          { proName: 'TVC:USOIL', title: 'Crude' },
        ],
      }}
    />
  )
}
