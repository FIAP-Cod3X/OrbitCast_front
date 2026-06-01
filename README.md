# 🛰️ OrbitCast — Plataforma de Transmissão via Satélite

**Global Solution FIAP 2025 · Economia Espacial · Conectividade via Satélite**

---

## 📋 Descrição

O **OrbitCast** é uma plataforma SaaS inteligente para planejamento de transmissões via satélite. Permite que emissoras, produtoras, eventos, empresas e instituições planejem a distribuição de conteúdo para regiões específicas — principalmente áreas remotas ou com baixa conectividade.

### Funcionalidades
- 🛰️ Simulação de transmissões com cálculo de custo estimado
- 🤖 Recomendações de IA para melhor estratégia de cobertura
- 📊 Dashboard analítico com gráficos e métricas em tempo real
- 🗺️ Mapeamento de regiões com índice de conectividade e prioridade social
- 📡 CRUD completo de campanhas, clientes, canais e regiões
- 🌐 Integração completa com API REST Java

---

## 🚀 Tecnologias Utilizadas

- React 18 + Vite 6 + TypeScript 5
- Tailwind CSS 4
- React Router DOM 7 (rotas estáticas e dinâmicas)
- Recharts (gráficos)
- Lucide React (ícones)
- fetch() para integração com API REST

---

## 📁 Estrutura de Pastas

```
src/
├── components/ui/     # Componentes reutilizáveis
├── pages/             # Todas as páginas
├── routes/            # Configuração de rotas
├── services/api.ts    # Integração com API via fetch()
├── hooks/             # Hooks customizados
├── types/             # Interfaces TypeScript
├── layouts/           # Layouts reutilizáveis
├── context/           # Context API (Toast)
└── App.tsx
```

---

## ⚙️ Como Usar

### Instalação

```bash
npm install
```

### Configurar API

```bash
cp .env.example .env
# Edite .env: VITE_API_URL=https://sua-api.com
```

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## 🔗 Links

| Recurso | URL |
|---|---|
| 📦 Repositório GitHub | https://github.com/SEU_USUARIO/orbitcast-frontend |
| 🎬 Vídeo YouTube | https://www.youtube.com/watch?v=SEU_VIDEO |
| 🌐 Deploy Vercel | https://orbitcast.vercel.app |

---

## 🔌 Endpoints Consumidos

| Método | Endpoint |
|---|---|
| GET/POST/PUT/DELETE | `/campanhas` / `/campanhas/:id` |
| POST | `/campanhas/:id/simulacoes` |
| GET/POST/PUT/DELETE | `/regioes` / `/regioes/:id` |
| GET | `/clientes`, `/canais`, `/dashboard/resumo` |

---

## 📄 Páginas

| Rota | Tipo |
|---|---|
| `/` Home, `/dashboard`, `/campanhas`, `/regioes`, `/simulacao` | Estática |
| `/campanhas/:id` | **Dinâmica com parâmetro** |
| `/sobre`, `/faq`, `/integrantes`, `/contato` | Estática |

---

## 👥 Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Integrante 1 | RM12345 | 1TDSPH | [github.com/usuario1](https://github.com/usuario1) | [linkedin.com/in/usuario1](https://linkedin.com/in/usuario1) |
| Integrante 2 | RM12346 | 1TDSPH | [github.com/usuario2](https://github.com/usuario2) | [linkedin.com/in/usuario2](https://linkedin.com/in/usuario2) |
| Integrante 3 | RM12347 | 1TDSPH | [github.com/usuario3](https://github.com/usuario3) | [linkedin.com/in/usuario3](https://linkedin.com/in/usuario3) |

---

## 📞 Contato

FIAP · Análise e Desenvolvimento de Sistemas · 1TDSPH · 2025

OrbitCast — Conectando o mundo por satélite 🛰️
