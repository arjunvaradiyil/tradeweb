'use client'

import { useEffect, useRef, useState } from 'react'

const PAIRS = [
  ['btcusdt', 'BTC/USDT'], ['ethusdt', 'ETH/USDT'], ['solusdt', 'SOL/USDT'], ['bnbusdt', 'BNB/USDT'],
  ['xrpusdt', 'XRP/USDT'], ['paxgusdt', 'GOLD (PAXG)'], ['eurusdt', 'EUR/USD'], ['gbpusdt', 'GBP/USD'],
] as const

type Tick = { price: number; open: number; dir: 'up' | 'down' | null; n: number }

// Live Binance public WebSocket: green/red flash on every price change.
export function TickerBar() {
  const [ticks, setTicks] = useState<Record<string, Tick>>({})
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    let retry: ReturnType<typeof setTimeout>
    let closed = false
    const connect = () => {
      const url = `wss://stream.binance.com:9443/stream?streams=${PAIRS.map(([s]) => `${s}@miniTicker`).join('/')}`
      const sock = (ws.current = new WebSocket(url))
      sock.onmessage = (ev) => {
        const d = JSON.parse(ev.data).data
        const price = parseFloat(d.c)
        setTicks((prev) => {
          const old = prev[d.s.toLowerCase()]
          const dir = old ? (price > old.price ? 'up' : price < old.price ? 'down' : old.dir) : null
          return { ...prev, [d.s.toLowerCase()]: { price, open: parseFloat(d.o), dir, n: (old?.n ?? 0) + 1 } }
        })
      }
      sock.onclose = () => { if (!closed) retry = setTimeout(connect, 3000) }
    }
    connect()
    return () => { closed = true; clearTimeout(retry); ws.current?.close() }
  }, [])

  const items = PAIRS.map(([sym, label]) => {
    const t = ticks[sym]
    const chg = t ? ((t.price - t.open) / t.open) * 100 : 0
    return (
      <span key={sym} className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-xs">
        <b className="text-white/80">{label}</b>
        {t ? (
          <>
            <span key={t.n} className={`rounded px-1 font-mono tabular-nums text-white ${t.dir === 'up' ? 'flash-up' : t.dir === 'down' ? 'flash-down' : ''}`}>
              {t.price.toLocaleString('en-US', { maximumFractionDigits: t.price < 10 ? 4 : 2 })}
            </span>
            <span className={chg >= 0 ? 'text-emerald-300' : 'text-red-300'}>{chg >= 0 ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}%</span>
          </>
        ) : <span className="text-white/40">...</span>}
      </span>
    )
  })

  return (
    <div className="overflow-hidden bg-navy py-2" aria-label="Live market ticker">
      <div className="flex w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
        <div>{items}</div>
        <div aria-hidden>{items}</div>
      </div>
      <style>{'@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}'}</style>
    </div>
  )
}
