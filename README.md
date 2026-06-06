# OrbitCast

Plataforma web para planejamento de transmissões via satélite em regiões remotas ou com baixa conectividade.

O projeto foi desenvolvido para a Global Solution FIAP 2026/1, integrando o front-end em React + Vite + TypeScript com uma API REST Java publicada no Render.

## Descrição

O OrbitCast ajuda equipes de mídia, educação, eventos, governo e instituições sociais a planejar campanhas de transmissão via satélite. A aplicação permite consultar regiões, cadastrar campanhas, associar regiões a campanhas, executar simulações e analisar indicadores de custo, alcance, qualidade de sinal e viabilidade.

## Funcionalidades

- SPA com rotas estáticas e dinâmicas usando React Router.
- Dashboard com métricas, gráficos e resumo operacional.
- CRUD de campanhas e regiões consumindo API REST Java.
- Simulação de campanhas por endpoint remoto.
- Associação de regiões a campanhas com prioridade e observação.
- Páginas institucionais obrigatórias: Home, Sobre, FAQ, Contato e Integrantes.
- Páginas da solução: Dashboard, Campanhas, Detalhe da Campanha, Regiões e Simulação.
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
- Fetch API para comunicação HTTP

## Como Usar

### Links da entrega

| Recurso | URL |
|---|---|
| Repositório GitHub | https://github.com/FIAP-Cod3X/OrbitCast_front |
| Repositório Back-End | https://github.com/Guilherme-Soares00/OrbitCast-Global |
| Deploy Vercel | https://orbitcast.vercel.app |
| API Java Render | https://orbitcast-global-api.onrender.com |
| Vídeo YouTube | Pendente: inserir URL após publicação |

### Instalação

```bash
npm install
```

### Configuração da API

Crie um arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Configuração usada para a entrega:

```env
VITE_API_URL=https://orbitcast-global-api.onrender.com
```

Para desenvolvimento com a API Java local:

```bash
git clone https://github.com/Guilherme-Soares00/OrbitCast-Global
cd OrbitCast-Global
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

### Build de produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

## Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Estática | Página inicial |
| `/sobre` | Estática | Apresentação do problema e da solução |
| `/faq` | Estática | Perguntas frequentes |
| `/contato` | Estática | Formulário institucional |
| `/integrantes` | Estática | Equipe, fotos, RM, turma e links |
| `/dashboard` | Estática | Indicadores e gráficos da API |
| `/campanhas` | Estática | Listagem, criação, edição e remoção de campanhas |
| `/campanhas/:id` | Dinâmica | Detalhe da campanha com parâmetro de rota |
| `/regioes` | Estática | CRUD de regiões |
| `/simulacao` | Estática | Execução de simulações |
| `*` | Fallback | Página 404 personalizada |

## Endpoints Consumidos

| Recurso | Métodos e endpoints |
|---|---|
| Health | `GET /health` |
| Dashboard | `GET /dashboard/resumo` |
| Clientes | `GET /clientes`, `GET /clientes/:id`, `POST /clientes`, `PUT /clientes/:id`, `DELETE /clientes/:id` |
| Canais | `GET /canais`, `GET /canais/:id`, `POST /canais`, `PUT /canais/:id`, `DELETE /canais/:id` |
| Regiões | `GET /regioes`, `GET /regioes/:id`, `POST /regioes`, `PUT /regioes/:id`, `DELETE /regioes/:id` |
| Campanhas | `GET /campanhas`, `GET /campanhas/:id`, `POST /campanhas`, `PUT /campanhas/:id`, `DELETE /campanhas/:id` |
| Campanha e regiões | `GET /campanhas/:id/regioes`, `POST /campanhas/:id/regioes/:regiaoId`, `DELETE /campanhas/:id/regioes/:regiaoId` |
| Simulações | `GET /simulacoes`, `GET /simulacoes/:id`, `GET /campanhas/:id/simulacoes`, `POST /campanhas/:id/simulacoes` |
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
|-- routes/              # Configuração de rotas
|-- services/            # Integração com API REST
|-- types/               # Interfaces e tipos TypeScript
|-- App.tsx
|-- main.tsx
```

## TypeScript e Arquitetura

- Interfaces para entidades da API em `src/types/index.ts`.
- Union types para status de campanha, viabilidade e estados de carregamento.
- Intersection types para modelos derivados de campanha e região.
- Service layer centralizada em `src/services/api.ts`.
- Layouts separados para páginas públicas e área operacional.
- Componentes reutilizáveis para botões, cards, modais, inputs, badges, loading e erros.
- Hooks React utilizados: `useState`, `useEffect`, `useContext`, `useCallback` e hook customizado `useDebounce`.

## Integração com API Java

A aplicação consome a API Java publicada em:

```text
https://orbitcast-global-api.onrender.com
```

O front-end usa `fetch()` diretamente, sem Axios, com:

- normalização da URL base;
- envio de `Content-Type: application/json` quando necessário;
- tratamento de respostas `204 No Content`;
- leitura de erros no formato `{ mensagem, erro }`;
- mensagens amigáveis quando a API não responde.

## Imagens e Ícones

- Fotos dos integrantes em `public/img/`.
- Ícones SVG em `public/icons.svg`.
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

FIAP - Análise e Desenvolvimento de Sistemas - Turma 1TDSPB - 2026

Repositório do front-end: https://github.com/FIAP-Cod3X/OrbitCast_front

Repositório do back-end: https://github.com/Guilherme-Soares00/OrbitCast-Global

API Java: https://orbitcast-global-api.onrender.com
