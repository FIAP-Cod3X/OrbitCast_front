import { useState } from 'react';
import { Globe, Brain, Zap, Radio, MapPin, Shield } from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';

const pageShell = 'public-page public-page-md';
const h1Class = 'mb-4 font-display text-[clamp(28px,4vw,40px)] font-bold text-white';
const eyebrowClass = 'mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]';

export function SobrePage() {
  const problemCards = [
    { icon:<Globe size={22}/>, title:'O Problema', color:'text-[var(--accent)]', bg:'bg-blue-400/10', border:'border-blue-400/20', desc:'Empresas e instituições que querem transmitir para áreas remotas não têm uma ferramenta simples para simular custos, planejar cobertura e validar viabilidade via satélite.' },
    { icon:<Brain size={22}/>, title:'Nossa Solução', color:'text-violet-300', bg:'bg-violet-300/10', border:'border-violet-300/20', desc:'O OrbitCast combina dados de conectividade regional com modelos de custo e IA para recomendar a melhor estratégia de cobertura com estimativa de alcance e score de viabilidade.' },
  ];

  const pillars = [
    {icon:<Zap size={18}/>,title:'Velocidade',desc:'Simulações em segundos',color:'text-amber-400'},
    {icon:<Shield size={18}/>,title:'Confiabilidade',desc:'Dados validados',color:'text-emerald-400'},
    {icon:<MapPin size={18}/>,title:'Cobertura',desc:'Todo o Brasil mapeado',color:'text-[var(--accent)]'},
    {icon:<Radio size={18}/>,title:'Acessibilidade',desc:'Para qualquer organização',color:'text-red-300'},
  ];

  return (
    <PublicLayout>
      <div className={pageShell}>
        <div className="mb-12 anim-fade-up">
          <span className={eyebrowClass}>Sobre o Projeto</span>
          <h1 className={h1Class}>Nossa Missão</h1>
          <p className="max-w-[600px] text-base leading-7 text-[var(--text-dim)]">
            O OrbitCast é uma plataforma inteligente para planejamento de transmissões via satélite, criada para democratizar o acesso à comunicação em regiões remotas do Brasil.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {problemCards.map(item => (
            <div key={item.title} className="card p-7 anim-fade-up">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border ${item.border} ${item.bg} ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="mb-2.5 font-display text-[17px] font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-[var(--text-dim)]">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="card p-7 anim-fade-up">
          <h3 className="mb-4 font-display text-base font-bold text-white">Tecnologias</h3>
          <div className="flex flex-wrap gap-2">
            {['React 19','Vite 8','TypeScript 6','Tailwind CSS','React Router DOM','Recharts','Java Quarkus','Oracle Database','REST API','Vercel'].map(t=>(
              <span key={t} className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3.5 py-1.5 text-[13px] text-[var(--text-muted)]">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          {pillars.map(p=>(
            <div key={p.title} className="card card-hover p-5 text-center anim-fade-up">
              <div className={`mb-2.5 flex justify-center ${p.color}`}>{p.icon}</div>
              <h4 className="mb-1 text-sm font-semibold text-white">{p.title}</h4>
              <p className="text-[13px] text-[var(--text-dim)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}

const faqs = [
  { q:'O que é o OrbitCast?', a:'Uma plataforma SaaS para planejamento inteligente de transmissões via satélite. Emissoras, produtoras, eventos e instituições simulam cobertura, calculam custos e recebem recomendações de IA para distribuir conteúdo em regiões remotas.' },
  { q:'Como funciona a simulação?', a:'Você cadastra uma campanha com orçamento, qualidade de sinal e duração, associa regiões desejadas e executa a simulação. O sistema calcula custo estimado, alcance em pessoas e score de viabilidade automaticamente.' },
  { q:'Quais qualidades de transmissão são suportadas?', a:'SD, HD, Full HD e 4K Ultra HD. Cada qualidade tem cálculo de custo diferente e a IA sugere a melhor relação custo-benefício para cada região.' },
  { q:'Como as regiões são classificadas?', a:'Cada região tem índice de conectividade, população estimada, área em km² e prioridade social de 1 a 5. Regiões com baixa conectividade e alta prioridade são priorizadas.' },
  { q:'Como configurar a URL da API?', a:'Crie um arquivo .env na raiz do projeto com VITE_API_URL=https://orbitcast.onrender.com. Essa URL aponta para a API Java publicada no Render.' },
  { q:'O sistema é responsivo?', a:'Sim. Funciona em mobile, tablet e desktop. Layout, tabelas e gráficos se adaptam automaticamente ao tamanho de tela.' },
  { q:'A API Java precisa estar rodando?', a:'Sim. O front-end consome a API REST Java publicada no Render. Para desenvolvimento local, tambem e possivel trocar a URL para http://localhost:8080.' },
];

function FaqItem({ q, a }: { q:string; a:string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-[10px] border transition-colors ${open ? 'border-[rgba(74,158,255,0.25)]' : 'border-[var(--border)]'}`}>
      <button onClick={()=>setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-5 py-4 text-left">
        <span className="text-[15px] font-medium text-white">{q}</span>
        <span className={`ml-3 shrink-0 text-xl text-[var(--accent)] transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="border-t border-[var(--border)] px-5 pb-[18px] pt-4">
          <p className="text-sm leading-7 text-[var(--text-dim)]">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  return (
    <PublicLayout>
      <div className="public-page public-page-sm">
        <div className="mb-12 text-center anim-fade-up">
          <h1 className={h1Class}>Perguntas Frequentes</h1>
          <p className="text-base text-[var(--text-dim)]">Tudo que você precisa saber sobre o OrbitCast.</p>
        </div>
        <div className="flex flex-col gap-2">
          {faqs.map((f,i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </PublicLayout>
  );
}

export function ContatoPage() {
  const [form, setForm] = useState({ nome:'',email:'',assunto:'',mensagem:'' });
  const [sent, setSent] = useState(false);
  const contactFields = [
    {key:'nome',label:'Nome *',type:'text',ph:'Seu nome'},
    {key:'email',label:'Email *',type:'email',ph:'seu@email.com'},
  ] as const;

  return (
    <PublicLayout>
      <div className="public-page public-page-xs">
        <div className="mb-10 anim-fade-up">
          <h1 className={h1Class}>Contato</h1>
          <p className="text-base text-[var(--text-dim)]">Fale com a equipe OrbitCast.</p>
        </div>

        {sent ? (
          <div className="card p-12 text-center anim-fade-up">
            <div className="mb-4 text-5xl">✓</div>
            <h3 className="mb-2 font-display text-xl font-bold text-white">Mensagem enviada!</h3>
            <p className="mb-5 text-[var(--text-dim)]">Entraremos em contato em breve.</p>
            <button onClick={()=>setSent(false)} className="btn-ghost btn-sm">Enviar outra mensagem</button>
          </div>
        ) : (
          <form
            className="card flex flex-col gap-[18px] p-8 anim-fade-up"
            onSubmit={e=>{e.preventDefault();if(form.nome&&form.email&&form.mensagem)setSent(true);}}
          >
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {contactFields.map(f=>(
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="form-label">{f.label}</label>
                  <input required type={f.type} className="form-input" placeholder={f.ph}
                    value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Assunto</label>
              <input className="form-input" placeholder="Assunto" value={form.assunto} onChange={e=>setForm({...form,assunto:e.target.value})} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Mensagem *</label>
              <textarea required className="form-input resize-y" placeholder="Como podemos ajudar?" rows={5}
                value={form.mensagem} onChange={e=>setForm({...form,mensagem:e.target.value})} />
            </div>
            <button type="submit" className="btn-primary justify-center py-[13px] text-[15px]">
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </PublicLayout>
  );
}
