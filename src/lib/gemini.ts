import { GoogleGenerativeAI, SchemaType, type Schema } from '@google/generative-ai'
import type { RedacaoFeedback } from '../types/redacao'

const STORAGE_KEY = 'concursoapp_gemini_api_key'

export class GeminiKeyMissingError extends Error {
  constructor() {
    super('Configure sua chave da API do Gemini em Configurações > Integrações (IA) antes de analisar.')
    this.name = 'GeminiKeyMissingError'
  }
}

const RESPONSE_SCHEMA: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    notaFinal: { type: SchemaType.NUMBER },
    notaMaxima: { type: SchemaType.NUMBER },
    correcoesGramaticais: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          original: { type: SchemaType.STRING },
          corrigido: { type: SchemaType.STRING },
          explicacao: { type: SchemaType.STRING },
        },
        required: ['original', 'corrigido', 'explicacao'],
      },
    },
    fazer: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    nuncaFazer: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    redacaoNota1000: {
      type: SchemaType.OBJECT,
      properties: {
        titulo: { type: SchemaType.STRING },
        texto: { type: SchemaType.STRING },
      },
      required: ['titulo', 'texto'],
    },
  },
  required: ['notaFinal', 'notaMaxima', 'correcoesGramaticais', 'fazer', 'nuncaFazer', 'redacaoNota1000'],
}

type AnalisarRedacaoInput = {
  banca: string
  cargo: string
  tema: string
  texto: string
}

function buildPrompt({ banca, cargo, tema, texto }: AnalisarRedacaoInput): string {
  return `Você é um corretor especialista em redações de concursos públicos brasileiros, atuando como se fosse um avaliador da banca "${banca}" para o cargo de "${cargo}".

Tema da redação: "${tema}"

Avalie a redação abaixo segundo os critérios técnicos dessa banca (norma culta, coesão, argumentação, adequação ao tema e, quando pertinente, conhecimento de Direito Administrativo/Constitucional). Aponte erros gramaticais reais encontrados no texto (crase, regência, concordância, pontuação), sugestões de argumentação para o candidato ("o que fazer") e erros críticos ou clichês que essa banca costuma penalizar ("o que nunca fazer"). Ao final, escreva uma redação nota 1000 sobre o mesmo tema, como exemplo.

Redação do candidato:
"""
${texto}
"""

Responda ESTRITAMENTE em JSON, sem markdown e sem nenhum texto fora do JSON, com notaFinal de 0 a 100 e notaMaxima sempre 100.`
}

export async function analisarRedacao(input: AnalisarRedacaoInput): Promise<RedacaoFeedback> {
  const apiKey = localStorage.getItem(STORAGE_KEY)?.trim()
  if (!apiKey) throw new GeminiKeyMissingError()

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
    },
  })

  const result = await model.generateContent(buildPrompt(input))
  const text = result.response.text()

  try {
    return JSON.parse(text) as RedacaoFeedback
  } catch {
    throw new Error('A IA retornou uma resposta em formato inesperado. Tente novamente.')
  }
}
