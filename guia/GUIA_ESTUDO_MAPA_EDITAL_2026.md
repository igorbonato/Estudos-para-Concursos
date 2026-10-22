# 🗺️ Mapa do Edital TRT4 2026 — Analista TI (14) e Técnico TI (22)

> **Referência:** Edital TRT4 nº 01/2026 (FCC), publicado em out/2026. **Substitui o edital de 2022**: em caso de conflito com qualquer guia antigo, vale este mapa. Fonte completa: `TRT4_2026_TI_atualizacao_projeto.md` na raiz do projeto.
>
> **Legenda usada em todos os guias:** **[A+T]** cai nos dois cargos · **[A]** só Analista · **[T]** só Técnico. **Priorize [A+T].**

---

## 1. O concurso em uma tela

| | Analista TI (14) | Técnico TI (22) |
|---|---|---|
| Remuneração inicial | R$ 16.040,88 | R$ 9.776,71 |
| Turno da prova | **Tarde** | **Manhã** |
| Taxa | R$ 110,00 | R$ 90,00 |
| Vagas | Cadastro de reserva | Cadastro de reserva |
| Meta de classificação | top ~10 | top ~20 |

**Datas:** inscrições de **26/10 a 25/11/2026** (pagamento até 26/11) · convocação em 11/01/2027 · **provas em 31/01/2027, em Porto Alegre** (os dois cargos no mesmo dia) · gabarito em 01/02 · resultado final previsto para 05/07/2027.

**Provas (iguais nos dois cargos):** Gerais 30 questões (peso 1) + Específicos 30 questões (**peso 2**) + redação (20 a 30 linhas). Nota objetiva = (G + 2E)/3, **mínimo 6,00**. A redação só é corrigida até a **400ª posição**, com **mínimo 6,00**. Desempate: Específicos → **Português** → redação → idade. **4h, sem relógio.**

**Implicações:** os Específicos valem **2/3** da objetiva. Português pesa **duas vezes** (desempate e redação). **Não cai Noções de Informática** nos Gerais para os cargos de TI.

---

## 2. Mapeamento dos guias existentes (válido / desatualizado / fora)

| Guia | Status | Resumo |
|---|---|---|
| **Língua Portuguesa** | ✅ Válido [A+T] | Tudo vale. Novo bloco de lacunas no fim (denotação, intertextualidade, formação de palavras, flexão, ortografia) |
| **Raciocínio Lógico-Matemático** | ✅ Válido + 🔄 ampliado | **Estatística** e **gráficos** voltaram ao edital; novo bloco no fim. Regra de três composta não está listada |
| **Desenvolvimento de Software e Frameworks** | ✅ Válido · ⚠️ parcialmente desatualizado | JUnit 5 → 6, Jakarta EE 11, JPA 3.2. A tabela "Fora do escopo" estava **errada** (PHP, Delphi, C, C#, VB, React e Vue voltaram) e foi corrigida |
| **Banco de Dados** | ✅ Válido [A] · ⚠️ versões | PostgreSQL 15 a 18 e Oracle 19c. ❌ DW/BI/OLAP, NoSQL/Big Data, SQL Server e MySQL saíram |
| **Redes de Computadores** | ✅ Válido · ⚠️ Wi-Fi · ❌ partes | +802.11be. ❌ OSPF/BGP/RIP, VoIP, RAID/SAN/Fibre Channel saíram |
| **Segurança da Informação** | ✅ Válido · ⚠️ versões | OWASP 2021 → **2025**; ISO 27005:2022/2023; 27701. Lacunas em **Segurança 2026** |
| **Arquitetura de Software** | ✅ Válido · ⚠️ CMMI/MPS | CMMI v2.0 → **v3.0**; MPS → **2024**. ❌ WCAG/eMAG, ERP, GED saíram |
| **Arquitetura de Computadores** | ❌ **Rebaixado** | O bloco saiu do edital. Só serve como apoio (memória virtual, E/S, compiladores, bases numéricas) |
| **Sistemas Operacionais** | ✅ Válido **só [A]** · ⚠️ versões | +Windows Server 2022/2025, Red Hat/Oracle Linux. ❌ virtualização saiu. **O Técnico não tem SO** |
| **Governança de TI** | ⚠️ Desatualizado em boa parte | COBIT 2019 e BPMN valem. ITIL 4 → **Version 5**, CMMI → **v3.0**, MPS → **2024**, +**PMBOK 8**. ❌ TOGAF, BSC, COSO, SISP, ISO 20000 saíram |

**Guias novos (edital 2026):** PDPJ-Br e Stack Java · Noções de Legislação · Direitos Humanos · Gestão, Governança e Processos 2026 · Segurança 2026 · DevOps, Infra e Redes 2026 · IA, Engenharia de Software e Testes 2026 · Linguagens (Analista) · Redação FCC.

### Saíram do edital (não estudar)
- **Gerais:** Lei 8.112/1990, Lei 9.784/1999, improbidade (8.429 + 14.230), licitações (14.133), LBI (13.146). A LGPD saiu dos Gerais, mas **continua nos Específicos** (Segurança).
- **Específicos:** arquitetura de computadores, armazenamento (RAID/SAN/NAS/Fibre Channel/backup VTL), virtualização, roteamento dinâmico, VoIP, DW/BI/Data Mining/OLAP, NoSQL/Big Data, SQL Server, MySQL, Tomcat, SOAP (só SOA conceitual), WCAG/eMAG, TOGAF, BSC, COSO/SOX, IN SISP 4, ISO 20000, COBIT 5/4.1, ITIL v3.

---

## 3. Lacunas por prioridade

Critério: **[A+T] e Específicos primeiro**, cruzando com o **nível do candidato** (forte → só questões; médio → teoria rápida; fraco/do zero → teoria completa).

| # | Lacuna | Cargo | Nível do candidato | Onde está o material |
|---|---|---|---|---|
| 1 | **Java/Spring/JPA/Hibernate/Envers/Flyway, Eureka/Zuul** | A+T | Fraco | PDPJ-Br e Stack Java |
| 2 | **Normativos PDPJ-Br/CNJ** (253, 284, 131, 396, 162, 443, 522, 574, MoReq-Jus) | A+T | Do zero | PDPJ-Br e Stack Java |
| 3 | **Português: itens novos** + **redação com a grade FCC** | A+T | Base escolar | Português (bloco final) · Redação FCC |
| 4 | **Estatística e gráficos** (RLM) | A+T | Base escolar | RLM (bloco final) |
| 5 | **OWASP Top 10:2025**, ISO 27001:2022/27002:2022, LGPD, ZTNA, NAC | A+T | Médio | Segurança 2026 |
| 6 | **CMMI v3.0, ISO 12207:2021, MR-MPS-SW 2024, BPMN** | A+T | Médio | Gestão, Governança e Processos 2026 |
| 7 | **Governança de TIC e PDTIC 2024-2026 do TRT4** | A+T | Do zero | Gestão, Governança e Processos 2026 (ler os originais no site do TRT4) |
| 8 | **Engenharia de requisitos, low-code/no-code, assistentes de IA** | A+T | Forte/médio | IA, Engenharia de Software e Testes 2026 |
| 9 | **Regimento TRT4, Código de Conduta, Res. CNJ 400/351, CSJT 360** | A+T | Do zero | Noções de Legislação |
| 10 | **Direitos Humanos** (bloco inteiro) | A+T | Do zero | Direitos Humanos |
| 11 | **Redes [A]**: 802.11be, 802.1X/802.3, Apache/IIS/JBoss, Zabbix/Prometheus/ELK/Fluentd | A | Fraco | DevOps, Infra e Redes 2026 · Redes |
| 12 | **SO [A]**: Windows Server 2022/2025, RHEL/Oracle Linux | A | Fraco | DevOps, Infra e Redes 2026 · Sistemas Operacionais |
| 13 | **PMBOK 8, ITIL Version 5** (COBIT 2019 já coberto) | A | Fraco | Gestão, Governança e Processos 2026 |
| 14 | **Linguagens do Analista**: PHP, Delphi, VB, C (+ Python) | A | Médio | Linguagens (Analista) |
| 15 | **IA [A]**: ML, redes neurais, LLMs | A | Forte | IA, Engenharia de Software e Testes 2026 (só questões) |
| 16 | **Itens [T]**: JUnit 6/Mockito/cobertura, Gitflow/GitLab, proxy reverso/LB, NAT/AAA/codificação, nuvem/serverless, CIS v8, 27005, SDL/CLASP, pós-quântica | T | Médio | IA/Eng. Software 2026 · DevOps 2026 · Segurança 2026 |
| 17 | **Revisão do que já domina** (.NET, BD, front, REST, Docker, ágil) | A+T | Forte | Só questões (15h no plano) |

**Se faltar tempo:** Português e Específicos [A+T] → itens [A] de redes, SO e governança → **legislação e Direitos Humanos nas últimas 3 semanas** (memorização de curto prazo).

---

## 4. Cronograma: 15 h/semana, ~190 h até 31/01/2027

> O plano semana a semana (com sessões por dia) está no **Dashboard → card "Plano TRT4"**, com o botão **"Lançar no calendário"**, que cria as metas no calendário de estudos.

**Carga:** 2 h nos dias úteis + 2h30 no sábado e no domingo. As semanas 9 e 10 (festas) são reduzidas.

| Bloco | Meta do edital | Planejado no app |
|---|---|---|
| Português e redação | 45 h | 38,5 h + redação nos 2 simulados |
| Raciocínio lógico e matemática | 25 h | 21,5 h |
| Legislação e Direitos Humanos | 25 h | 26 h |
| Java/Spring/PDPJ-Br e normativos CNJ | 35 h | 32,5 h |
| Redes e sistemas operacionais | 30 h | 29 h |
| Segurança e governança | 25 h | 25 h |
| Revisão do que já domina (questões) | 15 h | 11 h + correção dos simulados |
| Simulados (2 × 4 h) | — | 8 h |

### Fases e metas semanais

| Sem. | Período | Fase | Meta da semana |
|---|---|---|---|
| 1 | 26/10–01/11 | 1 · Base | **Inscrição nos dois cargos**; Java para quem vem do C#; Spring Boot; Regimento (leitura 1); concordância; lógica |
| 2 | 02/11–08/11 | 1 | Microsserviços PDPJ (Eureka/Zuul); Keycloak/OAuth (RFC 6749/9700); pontuação; porcentagem; Res. CNJ 351 |
| 3 | 09/11–15/11 | 1 | RabbitMQ/webhooks; Docker/K8s/Rancher; **estatística**; CSJT 360; Código de Conduta; Portarias 253/284/131 |
| 4 | 16/11–22/11 | 1 | Jakarta EE 11/JPA 3.2/Hibernate 7; ENSEC-PJ; MoReq-Jus e Res. 574; gráficos; **redação 1** |
| 5 | 23/11–29/11 | 1 | **Inscrição até 25/11**; JUnit 6/Mockito; exceções e JDBC; lógica proposicional; redação oficial; questões |
| 6 | 30/11–06/12 | 2 · Infra e normas | TCP/IP e protocolos; ISO 27001/27002; OWASP 2025; processos/threads; DH (teoria geral e CF/88); **redação 2** |
| 7 | 07/12–13/12 | 2 | Cabeamento/VLAN/STP; criptografia/TLS; memória; COBIT 2019 + governança e PDTIC do TRT4; DH (DUDH e Pactos); **redação 3** |
| 8 | 14/12–20/12 | 2 | Wi-Fi 6/7 e 802.1X; firewall/IDS/VPN/ZTNA; Windows Server/AD; **PMBOK 8**; DH (sistema interamericano); **redação 4** |
| 9 | 21/12–27/12 | 2 (festas) | NAT/AAA/proxy reverso; **ITIL 5**; DH (convenções temáticas); servidores web; LGPD; **redação 5** |
| 10 | 28/12–03/01 | 2 (festas) | **CMMI v3.0, 12207, MPS-SW 2024**; DH (TPI, ONU, CNJ 492, CSJT 368); ataques/controle de acesso; **redação 6** |
| 11 | 04/01–10/01 | 3 · Questões | Questões FCC por assunto (TRTs, TRF4 2025); **caderno de erros**; **redação 7** |
| 12 | 11/01–17/01 | 3 | Convocação (conferir o local); questões; **Simulado 1** (4 h, à mão, sem relógio) |
| 13 | 18/01–24/01 | 3 | Revisão do caderno de erros; **Simulado 2** |
| 14 | 25/01–30/01 | 4 · Reta final | Revisão leve e flashcards; **nada novo**. **Prova no domingo, 31/01** |

---

## 5. Como usar o app com este edital

- **Dashboard → Edital Verticalizado:** checklist dos tópicos com as tags [A+T]/[A]/[T] e filtro por cargo. O progresso fica salvo no navegador.
- **Dashboard → Plano TRT4:** a semana atual, com o botão para lançar as sessões no calendário. Marcar uma meta como concluída registra a sessão de estudo.
- **Redação:** banca FCC e grade oficial do edital (0 a 10 por critério, mínimo de 6,00).
- **Treinar:** crie decks para os normativos (PDPJ, CNJ, CSJT), DH (datas e decretos) e versões (OWASP 2025, ISO 27001:2022, PostgreSQL 15 a 18).
- **Supabase:** rode `supabase/migrations/006_trt4_edital_2026.sql` para gravar a data da prova (31/01/2027) no concurso TRT4.
