export type Nota = {
  id: string
  titulo: string
  preview: string
  data: string
  conteudo: string
}

export type Pasta = {
  id: string
  nome: string
  children?: Pasta[]
  notas?: Nota[]
}

export const PASTAS_MOCK: Pasta[] = [
  {
    id: 'banco-de-dados',
    nome: 'Banco de Dados',
    children: [
      {
        id: 'sql',
        nome: 'SQL',
        children: [
          {
            id: 'joins',
            nome: 'Joins',
            notas: [
              {
                id: 'joins-tipos',
                titulo: 'Tipos de JOIN: INNER x LEFT x RIGHT',
                preview:
                  'INNER JOIN retorna só as linhas com correspondência nas duas tabelas. LEFT JOIN mantém todas as linhas da tabela da esquerda...',
                data: '12 jul 2026',
                conteudo:
                  '<p><b>INNER JOIN</b> retorna apenas as linhas com correspondência nas duas tabelas.</p><p><b>LEFT JOIN</b> mantém todas as linhas da tabela da esquerda, preenchendo com NULL quando não há correspondência.</p><ul><li>RIGHT JOIN é o espelho do LEFT JOIN</li><li>FULL OUTER JOIN combina os dois lados</li></ul>',
              },
              {
                id: 'joins-self',
                titulo: 'Self Join na prática',
                preview: 'Usado para comparar linhas da mesma tabela, ex: funcionário e seu gestor...',
                data: '10 jul 2026',
                conteudo:
                  '<p>Usado para comparar linhas da mesma tabela, por exemplo funcionário e seu gestor na mesma tabela <code>funcionarios</code>.</p>',
              },
            ],
          },
          {
            id: 'normalizacao',
            nome: 'Normalização',
            notas: [
              {
                id: 'formas-normais',
                titulo: 'Formas Normais (1FN, 2FN, 3FN)',
                preview: '1FN elimina grupos repetitivos. 2FN elimina dependência parcial da chave...',
                data: '8 jul 2026',
                conteudo:
                  '<p><b>1FN</b>: elimina grupos repetitivos, atributos atômicos.</p><p><b>2FN</b>: elimina dependência parcial da chave primária.</p><p><b>3FN</b>: elimina dependência transitiva.</p>',
              },
            ],
          },
        ],
      },
      {
        id: 'modelagem',
        nome: 'Modelagem de Dados',
        notas: [
          {
            id: 'der-vs-mer',
            titulo: 'DER x MER: qual a diferença?',
            preview: 'DER é o Diagrama Entidade-Relacionamento, representação gráfica do MER...',
            data: '5 jul 2026',
            conteudo:
              '<p><b>DER</b> é a representação gráfica (diagrama) do <b>MER</b> (Modelo Entidade-Relacionamento), que é a descrição conceitual.</p>',
          },
        ],
      },
    ],
  },
  {
    id: 'redes',
    nome: 'Redes de Computadores',
    children: [
      {
        id: 'protocolos',
        nome: 'Protocolos',
        children: [
          {
            id: 'tcp-ip',
            nome: 'TCP/IP',
            notas: [
              {
                id: 'camadas-tcp-ip',
                titulo: 'As 4 camadas do modelo TCP/IP',
                preview: 'Aplicação, Transporte, Internet e Acesso à Rede. Cada camada mapeia para o OSI...',
                data: '11 jul 2026',
                conteudo:
                  '<p>Aplicação, Transporte, Internet e Acesso à Rede.</p><ul><li>Aplicação ~ Sessão+Apresentação+Aplicação (OSI)</li><li>Transporte ~ Transporte (OSI)</li><li>Internet ~ Rede (OSI)</li></ul>',
              },
            ],
          },
          {
            id: 'http-https',
            nome: 'HTTP/HTTPS',
            notas: [
              {
                id: 'metodos-http',
                titulo: 'Métodos HTTP mais cobrados',
                preview: 'GET (idempotente, sem corpo), POST (cria recurso), PUT (substitui), PATCH (atualiza parcial)...',
                data: '9 jul 2026',
                conteudo:
                  '<p><b>GET</b>: idempotente, sem corpo de requisição.</p><p><b>POST</b>: cria recurso, não idempotente.</p><p><b>PUT</b>: substitui o recurso inteiro, idempotente.</p><p><b>PATCH</b>: atualização parcial.</p>',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'engenharia-software',
    nome: 'Engenharia de Software',
    children: [
      {
        id: 'uml',
        nome: 'UML',
        notas: [
          {
            id: 'diagramas-uml',
            titulo: 'Diagramas UML: estrutural x comportamental',
            preview: 'Estruturais: classes, componentes, objetos. Comportamentais: casos de uso, sequência, atividades...',
            data: '7 jul 2026',
            conteudo:
              '<p><b>Estruturais</b>: classes, componentes, objetos, implantação.</p><p><b>Comportamentais</b>: casos de uso, sequência, atividades, estados.</p>',
          },
        ],
      },
      {
        id: 'metodologias-ageis',
        nome: 'Metodologias Ágeis',
        notas: [
          {
            id: 'scrum-papeis',
            titulo: 'Scrum: papéis, eventos e artefatos',
            preview: 'Papéis: PO, Scrum Master, Time. Eventos: Sprint, Daily, Planning, Review, Retro...',
            data: '4 jul 2026',
            conteudo:
              '<p><b>Papéis</b>: Product Owner, Scrum Master, Time de Desenvolvimento.</p><p><b>Eventos</b>: Sprint, Daily Scrum, Sprint Planning, Sprint Review, Retrospectiva.</p>',
          },
        ],
      },
    ],
  },
  {
    id: 'direito-constitucional',
    nome: 'Direito Constitucional',
    children: [
      {
        id: 'direitos-fundamentais',
        nome: 'Direitos Fundamentais',
        notas: [
          {
            id: 'geracoes-direitos',
            titulo: 'Gerações (dimensões) dos direitos fundamentais',
            preview: '1ª geração: liberdades individuais. 2ª: direitos sociais. 3ª: direitos difusos e coletivos...',
            data: '13 jul 2026',
            conteudo:
              '<p><b>1ª geração</b>: liberdades individuais (civis e políticas).</p><p><b>2ª geração</b>: direitos sociais, econômicos e culturais.</p><p><b>3ª geração</b>: direitos difusos e coletivos (meio ambiente, paz).</p>',
          },
        ],
      },
    ],
  },
  {
    id: 'portugues',
    nome: 'Português',
    children: [
      {
        id: 'crase',
        nome: 'Crase',
        notas: [
          {
            id: 'crase-regra-geral',
            titulo: 'Crase: regra geral e macete do "substituir por masculino"',
            preview: 'Troque o termo feminino por um masculino equivalente: se aparecer "ao", tem crase...',
            data: '6 jul 2026',
            conteudo:
              '<p>Macete: troque o termo feminino por um equivalente masculino. Se aparecer <b>"ao"</b>, existe crase.</p>',
          },
        ],
      },
      {
        id: 'concordancia-verbal',
        nome: 'Concordância Verbal',
        notas: [
          {
            id: 'sujeito-composto',
            titulo: 'Concordância com sujeito composto',
            preview: 'Sujeito composto antes do verbo: verbo no plural. Depois do verbo: pode concordar com o mais próximo...',
            data: '3 jul 2026',
            conteudo:
              '<p>Sujeito composto antes do verbo: verbo no plural.</p><p>Sujeito composto depois do verbo: pode concordar com o núcleo mais próximo.</p>',
          },
        ],
      },
    ],
  },
  {
    id: 'raciocinio-logico',
    nome: 'Raciocínio Lógico',
    children: [
      {
        id: 'logica-proposicional',
        nome: 'Lógica Proposicional',
        notas: [
          {
            id: 'tabelas-verdade',
            titulo: 'Tabelas-verdade dos conectivos principais',
            preview: 'E (conjunção): só é V se ambos V. OU (disjunção): V se pelo menos um for V...',
            data: '2 jul 2026',
            conteudo:
              '<p><b>E (∧)</b>: verdadeiro só se ambos forem verdadeiros.</p><p><b>OU (∨)</b>: verdadeiro se pelo menos um for verdadeiro.</p><p><b>Se...então (→)</b>: falso só quando antecedente V e consequente F.</p>',
          },
        ],
      },
    ],
  },
]
