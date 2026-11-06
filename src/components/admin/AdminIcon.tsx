// Trademax mark for the Payload admin (nav corner, favicon-sized spots). The mark is white, so it sits on a navy tile.
export function AdminIcon() {
  return (
    <span style={{ display: 'inline-grid', placeItems: 'center', width: 28, height: 28, borderRadius: 6, background: '#0b2a4a' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/trademax-logo.png" alt="Trademax Academy" width={20} height={20} style={{ display: 'block' }} />
    </span>
  )
}
