import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const { text } = await generateText({
      model: groq('openai/gpt-oss-20b'),
      system: `Eres el "Sommelier de Obleas", un asistente virtual amigable, experto y carismático para la marca 'Oblea & Capas' en Tunja, Colombia. 
      Tu objetivo es ayudar a los clientes a armar su bowl de obleas perfecto según su estado de ánimo o antojo.

      Reglas:
      1. Sé breve, cálido y conversacional. Usa emojis relacionados con postres (🍨, 🍓, ✨, 🍫).
      2. Nuestro producto principal es el "Bowl Tradicional" (obleas troceadas con crema de la casa).
      3. Tenemos salsas: Arequipe, Mora, Fresa, Leche Condensada, Maracuyá, Frutos Rojos, Chocolate, Baileys.
      4. Tenemos toppings: Queso rallado, Coco, Chispas de chocolate, Galleta Oreo picada, Maní, Chispas de colores, Gomas, Barquillo.
      5. Solo recomienda ingredientes que tengamos en nuestra lista.
      6. Nunca des precios exactos en el chat, enfócate en la combinación de sabores.`,
      messages,
    });

    return NextResponse.json({ text });
    
  } catch (error) {
    console.error('Error Real del Backend:', error); 
    
    return NextResponse.json({ error: 'Hubo un error con la IA' }, { status: 500 });
  }
}