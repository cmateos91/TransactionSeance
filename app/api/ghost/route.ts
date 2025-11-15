// API Route para obtener un fantasma aleatorio

import { NextResponse } from 'next/server';
import { getRandomFailedTransactions } from '@/lib/api/basescan';
import { generateGhost } from '@/lib/generators/ghost-generator';
import { es } from '@/lib/i18n/locales/es';
import { en } from '@/lib/i18n/locales/en';

export async function GET(request: Request) {
  try {
    // Obtener idioma de los query params
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get('lang') || 'es') as 'es' | 'en';
    const t = lang === 'es' ? es : en;

    // Reintentar hasta 10 veces para garantizar que encontramos un fantasma
    const maxAttempts = 10;
    let attempts = 0;
    let transactions: any[] = [];

    while (attempts < maxAttempts && transactions.length === 0) {
      attempts++;
      console.log(`🔍 Intento ${attempts}/${maxAttempts} - Buscando transacciones fallidas...`);

      try {
        transactions = await getRandomFailedTransactions(1);

        if (transactions.length > 0) {
          console.log(`✅ Encontrado en intento ${attempts}!`);
          break;
        }

        // Esperar 500ms entre intentos
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (err) {
        console.error(`❌ Error en intento ${attempts}:`, err);
        // Continuar con el siguiente intento
      }
    }

    if (transactions.length === 0) {
      console.error(`❌ No se encontraron transacciones después de ${maxAttempts} intentos`);
      return NextResponse.json(
        { error: t.errors.noTransactionsFound },
        { status: 503 }
      );
    }

    // Generar el fantasma con el idioma especificado
    const ghost = generateGhost(transactions[0], lang);

    return NextResponse.json({ ghost });
  } catch (error) {
    console.error('Error generating ghost:', error);

    // Si el error es por no encontrar transacciones, devolver mensaje específico
    const errorMessage = error instanceof Error ? error.message : 'Error al invocar el fantasma';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
