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
          background: 'linear-gradient(135deg, #0052FF 0%, #1a0b2e 50%, #EC4899 100%)',
          borderRadius: 256, // Icono circular
        }}
      >
        {/* Emoji */}
        <div
          style={{
            fontSize: 400,
          }}
        >
          👻
        </div>
      </div>
    ),
    {
      width: 1024,
      height: 1024, // Icono cuadrado 1024x1024
    },
  );
}
