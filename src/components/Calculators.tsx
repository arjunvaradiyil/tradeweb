'use client'

import { useMemo, useState } from 'react'

const inr = (n: number) => (isFinite(n) ? n.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '-')

function Field({ label, value, set, step = 'any' }: { label: string; value: number; set: (n: number) => void; step?: string }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <input type="number" step={step} value={value} onChange={(e) => set(parseFloat(e.target.value) || 0)} className="rounded-xl border border-line px-3 py-2 outline-none focus:border-brand" />
    </label>
  )
}
const Out = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-soft p-3"><p className="text-xs text-muted">{label}</p><p className="text-lg font-bold text-navy">{value}</p></div>
)

function PositionSize() {
  const [cap, setCap] = useState(100000), [risk, setRisk] = useState(1), [entry, setEntry] = useState(100), [sl, setSl] = useState(95)
  const r = useMemo(() => { const amt = (cap * risk) / 100, per = Math.abs(entry - sl); const qty = per ? Math.floor(amt / per) : 0; return { amt, qty, value: qty * entry } }, [cap, risk, entry, sl])
  return <Card title="Position size (stocks / crypto)"><Field label="Capital" value={cap} set={setCap} /><Field label="Risk per trade (%)" value={risk} set={setRisk} /><Field label="Entry price" value={entry} set={setEntry} /><Field label="Stop-loss price" value={sl} set={setSl} />
    <Out label="Risk amount" value={inr(r.amt)} /><Out label="Quantity" value={inr(r.qty)} /><Out label="Position value" value={inr(r.value)} /></Card>
}

function PipValue() {
  const [lots, setLots] = useState(1), [pips, setPips] = useState(20), [pipUsd, setPipUsd] = useState(10)
  return <Card title="Forex pip value & P/L"><Field label="Lot size" value={lots} set={setLots} /><Field label="Pips moved" value={pips} set={setPips} /><Field label="Pip value per standard lot (USD)" value={pipUsd} set={setPipUsd} />
    <Out label="Profit / loss (USD)" value={inr(lots * pips * pipUsd)} /></Card>
}

function Sip() {
  const [m, setM] = useState(10000), [rate, setRate] = useState(12), [yrs, setYrs] = useState(10)
  const r = useMemo(() => { const i = rate / 1200, n = yrs * 12; const fv = i ? m * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) : m * n; return { fv, inv: m * n } }, [m, rate, yrs])
  return <Card title="SIP / compounding"><Field label="Monthly investment" value={m} set={setM} /><Field label="Expected return (% p.a.)" value={rate} set={setRate} /><Field label="Years" value={yrs} set={setYrs} />
    <Out label="Invested" value={inr(r.inv)} /><Out label="Future value" value={inr(r.fv)} /><Out label="Gain" value={inr(r.fv - r.inv)} /></Card>
}

function RiskReward() {
  const [entry, setEntry] = useState(100), [sl, setSl] = useState(95), [tp, setTp] = useState(115)
  const risk = Math.abs(entry - sl), reward = Math.abs(tp - entry)
  return <Card title="Risk : reward"><Field label="Entry" value={entry} set={setEntry} /><Field label="Stop-loss" value={sl} set={setSl} /><Field label="Target" value={tp} set={setTp} />
    <Out label="Ratio" value={risk ? `1 : ${(reward / risk).toFixed(2)}` : '-'} /><Out label="Break-even win rate" value={risk + reward ? `${((risk / (risk + reward)) * 100).toFixed(1)}%` : '-'} /></Card>
}

function Margin() {
  const [price, setPrice] = useState(1.1), [lots, setLots] = useState(1), [lev, setLev] = useState(100), [contract, setContract] = useState(100000)
  return <Card title="Forex margin required"><Field label="Price" value={price} set={setPrice} /><Field label="Lots" value={lots} set={setLots} /><Field label="Contract size" value={contract} set={setContract} /><Field label="Leverage (1:x)" value={lev} set={setLev} />
    <Out label="Margin (quote currency)" value={inr((price * lots * contract) / (lev || 1))} /></Card>
}

function Brokerage() {
  const [buy, setBuy] = useState(100), [sell, setSell] = useState(105), [qty, setQty] = useState(100), [fee, setFee] = useState(0.1)
  const r = useMemo(() => { const gross = (sell - buy) * qty, charges = ((buy + sell) * qty * fee) / 100; return { gross, charges, net: gross - charges } }, [buy, sell, qty, fee])
  return <Card title="Profit after charges"><Field label="Buy price" value={buy} set={setBuy} /><Field label="Sell price" value={sell} set={setSell} /><Field label="Quantity" value={qty} set={setQty} /><Field label="Total charges (% of turnover)" value={fee} set={setFee} />
    <Out label="Gross P/L" value={inr(r.gross)} /><Out label="Charges" value={inr(r.charges)} /><Out label="Net P/L" value={inr(r.net)} /></Card>
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="card grid content-start gap-3 p-6"><h3 className="ed-tag !text-base font-semibold uppercase tracking-tight">{title}</h3>{children}</section>
}

const ALL = { stock: [PositionSize, Brokerage, Sip, RiskReward], forex: [PipValue, Margin, PositionSize, RiskReward], crypto: [PositionSize, Brokerage, RiskReward, Sip] }

export function Calculators({ market }: { market?: 'stock' | 'forex' | 'crypto' }) {
  const list = market ? ALL[market] : [PositionSize, PipValue, Margin, Brokerage, Sip, RiskReward]
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map((C, i) => <C key={i} />)}</div>
}
