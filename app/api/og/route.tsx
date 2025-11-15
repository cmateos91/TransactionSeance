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
          background: 'linear-gradient(135deg, #000a1f 0%, #001433 50%, #000000 100%)',
          fontFamily: 'system-ui',
        }}
      >
        {/* Título */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #0052FF, #EC4899)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          Transaction Séance
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 32,
            color: '#9CA3AF',
            marginBottom: 40,
          }}
        >
          Blockchain Archaeology on Base
        </div>

        {/* Emoji decorativo */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 30,
          }}
        >
          👻⛓️
        </div>

        {/* Call to action */}
        <div
          style={{
            fontSize: 28,
            color: '#D1D5DB',
            textAlign: 'center',
          }}
        >
          Invoke the spirits of forgotten transactions
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 800, // 3:2 aspect ratio requerido por Farcaster Mini Apps
    },
  );
}
