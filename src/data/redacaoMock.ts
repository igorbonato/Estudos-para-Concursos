export const BANCAS = ['FCC', 'Cebraspe', 'FGV', 'Vunesp', 'IBFC'] as const

export type CorrecaoGramatical = {
  original: string
  corrigido: string
  explicacao: string
}

export type RedacaoFeedback = {
  notaFinal: number
  notaMaxima: number
  correcoesGramaticais: CorrecaoGramatical[]
  fazer: string[]
  nuncaFazer: string[]
  redacaoNota1000: { titulo: string; texto: string }
}

export const REDACAO_FEEDBACK_MOCK: RedacaoFeedback = {
  notaFinal: 90,
  notaMaxima: 100,
  correcoesGramaticais: [
    {
      original: 'A proposta visa à melhoria dos serviços prestados à população.',
      corrigido: 'A proposta visa a melhoria dos serviços prestados à população.',
      explicacao: '"Visar" no sentido de "ter como objetivo" não exige crase antes de substantivo sem outro motivo para o acento indicativo.',
    },
    {
      original: 'É preciso assistir o cidadão em suas demandas mais urgentes.',
      corrigido: 'É preciso assistir ao cidadão em suas demandas mais urgentes.',
      explicacao: '"Assistir" no sentido de "prestar assistência" é verbo transitivo indireto: assistir a alguém.',
    },
    {
      original: 'Fazem cinco anos que a reforma administrativa foi proposta.',
      corrigido: 'Faz cinco anos que a reforma administrativa foi proposta.',
      explicacao: '"Fazer" indicando tempo decorrido é impessoal e fica sempre na 3ª pessoa do singular.',
    },
    {
      original: 'O órgão onde foi implementada a medida teve resultados positivos, mas o problema onde se discute é a falta de recursos.',
      corrigido: 'O órgão em que foi implementada a medida teve resultados positivos, mas o problema de que se trata é a falta de recursos.',
      explicacao: '"Onde" só deve ser usado para retomar lugar físico; para ideias e problemas, use "em que", "de que", "sobre o qual" etc.',
    },
  ],
  fazer: [
    'Contextualizar o tema com dados oficiais, pesquisas ou marcos legais (leis, artigos da Constituição).',
    'Citar princípios da Administração Pública (legalidade, impessoalidade, eficiência) quando pertinente ao tema.',
    'Propor uma solução concreta e exequível na conclusão, indicando agente, meio e finalidade.',
    'Manter coesão com conectores variados entre parágrafos (além disso, nesse sentido, por conseguinte).',
    'Reler o texto ao final procurando erros de concordância e regência antes de finalizar.',
  ],
  nuncaFazer: [
    'Abrir com clichês do tipo "desde os primórdios da humanidade" ou "é cediço que".',
    'Escrever em primeira pessoa ou emitir opinião pessoal explícita ("eu acho", "na minha opinião").',
    'Copiar trechos literais do enunciado ou da coletânea de textos motivadores.',
    'Fugir do tema proposto para discorrer sobre um assunto correlato mais confortável.',
    'Propor soluções vagas sem indicar quem executa e como ("o governo deveria melhorar as coisas").',
  ],
  redacaoNota1000: {
    titulo: 'A reforma administrativa como caminho para a eficiência no serviço público',
    texto:
      'A Constituição Federal de 1988 elenca, em seu art. 37, os princípios que regem a Administração Pública, entre eles o da eficiência, incluído pela Emenda Constitucional nº 19/1998. Passadas mais de duas décadas, contudo, o aparelho estatal brasileiro ainda convive com estruturas burocráticas rígidas, sobreposição de competências entre órgãos e dificuldade de atrair e reter talentos técnicos, o que compromete a qualidade dos serviços prestados ao cidadão.\n\nEsse cenário decorre, em primeiro lugar, de um modelo de carreira pouco flexível, que dificulta a mobilidade de servidores entre áreas e a atualização constante de competências exigidas por um Estado cada vez mais digital. Em segundo lugar, a ausência de mecanismos robustos de avaliação de desempenho impede que a meritocracia seja, de fato, um critério relevante para progressão e alocação de pessoal, favorecendo o imobilismo institucional.\n\nSoma-se a isso a fragmentação de sistemas de informação entre os órgãos, que obriga o cidadão a repetir os mesmos dados em diferentes balcões de atendimento, físicos ou digitais, contrariando a lógica do "governo como uma plataforma única" adotada por países como Estônia e Dinamarca em seus processos de transformação digital.\n\nPortanto, cabe ao Poder Executivo, em conjunto com o Congresso Nacional, avançar na modernização do marco legal do serviço público, estabelecendo trilhas de capacitação continuada vinculadas à carreira e metas de integração de dados entre órgãos, sob coordenação do Ministério da Gestão. Somente assim a eficiência deixará de ser um princípio formal na Constituição para se tornar realidade na experiência diária do cidadão com o Estado.',
  },
}
