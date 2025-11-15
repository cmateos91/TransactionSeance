import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Frame interaction:', body);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Cuando el usuario hace click en "Invoke Spirit", redirigir a la app completa
    return NextResponse.json({
      type: 'frame',
      frameUrl: baseUrl,
    });
  } catch (error) {
    console.error('Error processing frame interaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Transaction Séance Frame API',
    version: '1.0',
  });
}
