# OrbitCast

Plataforma web para planejamento de transmissoes via satelite em regioes remotas ou com baixa conectividade.

O projeto foi desenvolvido para a Global Solution FIAP 2025, integrando o front-end em React + Vite + TypeScript com uma API REST Java publicada no Render.

## Descricao

O OrbitCast ajuda equipes de midia, educacao, eventos, governo e instituicoes sociais a planejar campanhas de transmissao via satelite. A aplicacao permite consultar regioes, cadastrar campanhas, associar regioes a campanhas, executar simulacoes e analisar indicadores de custo, alcance, qualidade de sinal e viabilidade.

## Funcionalidades

- SPA com rotas estaticas e dinamicas usando React Router.
- Dashboard com metricas, graficos e resumo operacional.
- CRUD de campanhas e regioes consumindo API REST Java.
- Simulacao de campanhas por endpoint remoto.
- Associacao de regioes a campanhas com prioridade e observacao.
- Paginas institucionais obrigatorias: Home, Sobre, FAQ, Contato e Integrantes.
- Paginas da solucao: Dashboard, Campanhas, Detalhe da Campanha, Regioes e Simulacao.
- Tratamento de carregamento, erro e feedbacks por Toast.
- Layout responsivo para mobile, tablet e desktop.

## Tecnologias Utilizadas

- React 19
- Vite 8
- TypeScript 6
- Tailwind CSS 4
- React Router DOM 7
- Recharts
- Lucide React
- Fetch API para comunicacao HTTP

## Como Usar

### Links da entrega

| Recurso | URL |
|---|---|
| Repositorio GitHub | https://github.com/FIAP-Cod3X/OrbitCast_front |
| Deploy Vercel | https://orbitcast.vercel.app |
| API Java Render | https://orbitcast.onrender.com |
| Video YouTube | Pendente: inserir URL apos publicacao |

### Instalacao

```bash
npm install
```

### Configuracao da API

Crie um arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Configuracao usada para a entrega:

```env
VITE_API_URL=https://orbitcast.onrender.com
```

Para desenvolvimento com a API Java local:

```bash
cd ../OrbitCast
mvn quarkus:dev
```

Depois altere o `.env` do front-end:

```env
VITE_API_URL=http://localhost:8080
```

### Desenvolvimento

```bash
npm run dev
```

### Build de producao

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

## Rotas

| Rota | Tipo | Descricao |
|---|---|---|
| `/` | Estatica | Pagina inicial |
| `/sobre` | Estatica | Apresentacao do problema e da solucao |
| `/faq` | Estatica | Perguntas frequentes |
| `/contato` | Estatica | Formulario institucional |
| `/integrantes` | Estatica | Equipe, fotos, RM, turma e links |
| `/dashboard` | Estatica | Indicadores e graficos da API |
| `/campanhas` | Estatica | Listagem, criacao, edicao e remocao de campanhas |
| `/campanhas/:id` | Dinamica | Detalhe da campanha com parametro de rota |
| `/regioes` | Estatica | CRUD de regioes |
| `/simulacao` | Estatica | Execucao de simulacoes |
| `*` | Fallback | Pagina 404 personalizada |

## Endpoints Consumidos

| Recurso | Metodos e endpoints |
|---|---|
| Health | `GET /health` |
| Dashboard | `GET /dashboard/resumo` |
| Clientes | `GET /clientes`, `GET /clientes/:id`, `POST /clientes`, `PUT /clientes/:id`, `DELETE /clientes/:id` |
| Canais | `GET /canais`, `GET /canais/:id`, `POST /canais`, `PUT /canais/:id`, `DELETE /canais/:id` |
| Regioes | `GET /regioes`, `GET /regioes/:id`, `POST /regioes`, `PUT /regioes/:id`, `DELETE /regioes/:id` |
| Campanhas | `GET /campanhas`, `GET /campanhas/:id`, `POST /campanhas`, `PUT /campanhas/:id`, `DELETE /campanhas/:id` |
| Campanha e regioes | `GET /campanhas/:id/regioes`, `POST /campanhas/:id/regioes/:regiaoId`, `DELETE /campanhas/:id/regioes/:regiaoId` |
| Simulacoes | `GET /simulacoes`, `GET /simulacoes/:id`, `GET /campanhas/:id/simulacoes`, `POST /campanhas/:id/simulacoes` |
| Planos de cobertura | `GET /planos-cobertura`, `GET /planos-cobertura/:id`, `POST /planos-cobertura`, `PUT /planos-cobertura/:id`, `DELETE /planos-cobertura/:id` |

## Estrutura de Pastas

```text
src/
|-- assets/              # Imagens e assets internos
|-- components/          # Componentes compartilhados
|   |-- ui/              # Componentes base de interface
|-- context/             # Context API para Toast
|-- hooks/               # Hooks customizados
|-- layouts/             # Layouts publico e dashboard
|-- pages/               # Paginas da SPA
|-- routes/              # Configuracao de rotas
|-- services/            # Integracao com API REST
|-- types/               # Interfaces e tipos TypeScript
|-- App.tsx
|-- main.tsx
```

## TypeScript e Arquitetura

- Interfaces para entidades da API em `src/types/index.ts`.
- Union types para status de campanha, viabilidade e estados de carregamento.
- Intersection types para modelos derivados de campanha e regiao.
- Service layer centralizada em `src/services/api.ts`.
- Layouts separados para paginas publicas e area operacional.
- Componentes reutilizaveis para botoes, cards, modais, inputs, badges, loading e erros.
- Hooks React utilizados: `useState`, `useEffect`, `useContext`, `useCallback` e hook customizado `useDebounce`.

## Integracao com API Java

A aplicacao consome a API Java publicada em:

```text
https://orbitcast.onrender.com
```

O front-end usa `fetch()` diretamente, sem Axios, com:

- normalizacao da URL base;
- envio de `Content-Type: application/json` quando necessario;
- tratamento de respostas `204 No Content`;
- leitura de erros no formato `{ mensagem, erro }`;
- mensagens amigaveis quando a API nao responde.

## Imagens e Icones

- Fotos dos integrantes em `public/img/`.
- Icones SVG em `public/icons.svg`.
- Favicon em `public/favicon.svg`.
- Imagem de apoio em `src/assets/hero.png`.
- Iconografia da interface com Lucide React.

## Integrantes

| Foto | Nome completo | RM | Turma | GitHub | LinkedIn |
|:---:|---|---|---|---|---|
| <img src="./public/img/gabriel.jpg" width="80"> | Gabriel Stuani | RM566682 | 1TDSPB | [Gstuani](https://github.com/Gstuani) | [LinkedIn](https://www.linkedin.com/in/gabrielstuani/) |
| <img src="./public/img/guilherme.jpeg" width="80"> | Guilherme Soares | RM568227 | 1TDSPB | [Guilherme-Soares00](https://github.com/Guilherme-Soares00) | [LinkedIn](https://www.linkedin.com/in/guilherme-soares-alberti/) |
| <img src="./public/img/erick.jpeg" width="80"> | Erick Ramos Santos | RM567837 | 1TDSPB | [erickramossantoser](https://github.com/erickramossantoser) | [LinkedIn](https://www.linkedin.com/in/erickrsantos/) |
| <img src="./public/img/matheus.jpg" width="80"> | Matheus Carneiro Maciel | RM567753 | 1TDSPB | [kakarneiro](https://github.com/kakarneiro) | [LinkedIn](https://www.linkedin.com/in/matheus-carneiro-maciel?trk=contact-info) |

## Contato

FIAP - Analise e Desenvolvimento de Sistemas - Turma 1TDSPB - 2025

Repositorio do front-end: https://github.com/FIAP-Cod3X/OrbitCast_front

API Java: https://orbitcast.onrender.com
