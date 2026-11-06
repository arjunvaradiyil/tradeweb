// Trademax logo for the Payload admin login screen and nav.
export function AdminLogo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <span style={{ display: 'inline-grid', placeItems: 'center', width: 64, height: 64, borderRadius: 14, background: '#0b2a4a' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/trademax-logo.png" alt="Trademax Academy" width={46} height={46} style={{ display: 'block' }} />
      </span>
      <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: '#0b2a4a' }}>Trademax Academy</span>
    </span>
  )
}
