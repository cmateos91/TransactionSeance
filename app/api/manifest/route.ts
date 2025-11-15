import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const manifest = {
    miniapp: {
      version: "1",
      name: "Transaction Séance",
      iconUrl: `${baseUrl}/api/icon`,
      homeUrl: baseUrl,
      description: "Invoke the spirits of forgotten transactions on Base. Each ghost is unique and based on real blockchain data.",
      splashImageUrl: `${baseUrl}/api/splash`,
      splashBackgroundColor: "#1a0b2e",
    },
    // accountAssociation se debe generar con la herramienta oficial de Farcaster
    // https://farcaster.xyz/~/developers/mini-apps/manifest
    accountAssociation: {
      header: "TODO: Generar con herramienta oficial",
      payload: "TODO: Generar con herramienta oficial",
      signature: "TODO: Generar con herramienta oficial"
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
