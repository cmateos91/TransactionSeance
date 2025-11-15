import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a0b2e', // splashBackgroundColor definido en metadata
          fontFamily: 'system-ui',
        }}
      >
        {/* Emoji grande */}
        <div
          style={{
            fontSize: 200,
            marginBottom: 40,
          }}
        >
          👻⛓️
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #0052FF, #EC4899)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          Transaction Séance
        </div>

        {/* Loading indicator */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 40,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0052FF', opacity: 0.6 }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0052FF', opacity: 0.8 }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0052FF', opacity: 1 }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1600, // Splash screen típicamente más alto
    },
  );
}
