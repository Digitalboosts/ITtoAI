import { ImageResponse } from 'next/og';

export const alt = 'ITtoAI — Your IT Career. Upgraded for AI.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadManropeBold() {
  const res = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/manrope@latest/latin-800-normal.ttf');
  return res.arrayBuffer();
}

export default async function Image() {
  const manropeBold = await loadManropeBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B1628 0%, #1B3A6B 55%, #2563EB 100%)',
          fontFamily: 'Manrope',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 48 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #2563EB, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: 'white', fontSize: 36, fontWeight: 800 }}>{'>'}</div>
          </div>
          <div style={{ color: 'white', fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em' }}>ITtoAI</div>
        </div>
        <div style={{ display: 'flex', color: 'white', fontSize: 68, fontWeight: 800, textAlign: 'center', lineHeight: 1.15 }}>
          Your IT Career.
        </div>
        <div style={{ display: 'flex', color: '#93C5FD', fontSize: 68, fontWeight: 800, textAlign: 'center', lineHeight: 1.15 }}>
          Upgraded for AI.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Manrope', data: manropeBold, weight: 800, style: 'normal' }],
    }
  );
}
