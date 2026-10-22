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
    criterios: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          grupo: { type: SchemaType.STRING },
          criterio: { type: SchemaType.STRING },
          nota: { type: SchemaType.NUMBER },
          notaMaxima: { type: SchemaType.NUMBER },
          comentario: { type: SchemaType.STRING },
        },
        required: ['grupo', 'criterio', 'nota', 'notaMaxima', 'comentario'],
      },
    },
    motivoNotaZero: { type: SchemaType.STRING },
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
  required: ['notaFinal', 'notaMaxima', 'criterios', 'correcoesGramaticais', 'fazer', 'nuncaFazer', 'redacaoNota1000'],
}

// Grade da FCC no Edital TRT4 nº 01/2026 (soma 10,00).
const GRADE_FCC = `GRADE OFICIAL (FCC – TRT4 2026), total 10,00:
1. Grupo "Tema" (7,00):
   - "Recorte temático" (até 2,00)
   - "Interpretação crítica dos textos de apoio" (até 2,00)
   - "Progressão textual" (até 3,00)
2. Grupo "Norma-padrão" (3,00):
   - "Propriedade vocabular" (até 0,80)
   - "Coesão" (até 1,60)
   - "Morfossintaxe" (até 0,60)
Atribua NOTA ZERO (todos os critérios = 0 e explique em motivoNotaZero) se houver: fuga ao tema ou ao gênero dissertativo-argumentativo; texto com até 7 linhas; identificação do candidato; cópia dos textos de apoio.
Extensão esperada: 20 a 30 linhas manuscritas. A FCC orienta NÃO marcar recuo de parágrafo. O tema é de interesse geral, não ligado aos Conhecimentos Específicos. Nota mínima para aprovação: 6,00.`

const GRADE_GENERICA = `Use os critérios típicos dessa banca, agrupados em "Tema/Conteúdo" e "Norma-padrão/Expressão", normalizando a soma para 10,00. Se houver fuga ao tema/gênero, atribua nota zero e explique em motivoNotaZero.`

type AnalisarRedacaoInput = {
  banca: string
  cargo: string
  tema: string
  texto: string
}

function buildPrompt({ banca, cargo, tema, texto }: AnalisarRedacaoInput): string {
  const grade = banca === 'FCC' ? GRADE_FCC : GRADE_GENERICA

  return `Você é um corretor especialista em redações de concursos públicos brasileiros, atuando como avaliador da banca "${banca}" para o cargo de "${cargo || 'Analista/Técnico Judiciário – TI'}".

Tema da redação: "${tema}"

${grade}

Avalie a redação abaixo com o rigor real da banca. Preencha "criterios" com uma entrada por critério da grade (grupo, criterio, nota, notaMaxima, comentario curto e específico, citando trechos do texto). notaFinal = soma das notas dos critérios, de 0 a 10, com duas casas decimais; notaMaxima sempre 10. Se não houver motivo de nota zero, deixe motivoNotaZero como string vazia.
Aponte erros gramaticais reais do texto (crase, regência, concordância, pontuação, colocação pronominal), sugestões de argumentação ("fazer") e erros críticos ou clichês que a banca penaliza ("nuncaFazer"). Ao final, escreva uma redação modelo nota máxima sobre o mesmo tema, com 25 a 30 linhas, parágrafos separados por linha em branco, sem título se a banca não exigir (nesse caso use o tema como titulo).

Redação do candidato:
"""
${texto}
"""

Responda ESTRITAMENTE em JSON, sem markdown e sem nenhum texto fora do JSON.`
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
