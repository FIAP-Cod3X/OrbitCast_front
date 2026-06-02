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

| Foto | Nome Completo | RM | Turma | GitHub | LinkedIn |
|:----:|:-------------:|:--:|:-----:|:------:|:--------:|
| <img src="./public/img/gabriel.jpg" width="80"> | **Gabriel Stuani** | RM566682 | 1TDSPB | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github)](https://github.com/Gstuani) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gabrielstuani/) |
| <img src="./public/img/guilherme.jpeg" width="80"> | **Guilherme Soares** | RM568227 | 1TDSPB | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github)](https://github.com/Guilherme-Soares00) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/guilherme-soares-alberti/) |
| <img src="./public/img/erick.jpeg" width="80"> | **Erick Ramos Santos** | RM567837 | 1TDSPB | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github)](https://github.com/erickramossantoser) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/erickrsantos/) |
| Sem foto | **Matheus Carneiro Maciel** | RM567753 | 1TDSPB | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github)](https://github.com/kakarneiro) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/matheus-carneiro-maciel?trk=contact-info) |

---

## 📞 Contato

FIAP · Análise e Desenvolvimento de Sistemas · 1TDSPH · 2025

OrbitCast — Conectando o mundo por satélite 🛰️
