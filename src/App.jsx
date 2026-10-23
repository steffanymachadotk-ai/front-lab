import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, BookOpen,
  Check, ChevronDown, CircleHelp, Code2, Command, ExternalLink, Eye, Gauge,
  Github, Layers3, Maximize2, Menu, MonitorPlay, MousePointer2, Play, RotateCcw,
  Sparkles, X, Zap,
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, Cell,
} from 'recharts'
import { chapters, timeline } from './data/chapters'

const chartData = [
  { epoch: '01', accuracy: 48, validation: 44 },
  { epoch: '02', accuracy: 61, validation: 56 },
  { epoch: '03', accuracy: 72, validation: 67 },
  { epoch: '04', accuracy: 81, validation: 75 },
  { epoch: '05', accuracy: 89, validation: 82 },
  { epoch: '06', accuracy: 96, validation: 87 },
]
const classData = [
  { name: 'Positivo', f1: 0.91 },
  { name: 'Negativo', f1: 0.88 },
  { name: 'Neutro', f1: 0.79 },
  { name: 'Misto', f1: 0.58 },
]
const sentimentExamples = [
  { text: 'Esse recurso deixou meu trabalho muito mais fácil!', result: 'Positivo', color: 'lime' },
  { text: 'Não gostei do resultado; ficou bem abaixo do esperado.', result: 'Negativo', color: 'orange' },
  { text: 'O sistema foi atualizado ontem.', result: 'Neutro', color: 'cyan' },
]

function Logo() {
  return <div className="brand-mark"><span className="brand-symbol">F<span>/</span></span><span>FRONT<span className="brand-slash">//</span>LAB</span></div>
}

function Header({ mode, setMode, onHome }) {
  return (
    <header className="topbar">
      <button className="logo-button" onClick={onHome} aria-label="Voltar ao início"><Logo /></button>
      <div className="topbar-center"><span className="live-dot" /> <span>FRONT-END / AI LABS</span><span className="topbar-divider">/</span><span className="muted">PORTFÓLIO ACADÊMICO</span></div>
      <div className="mode-switch" role="group" aria-label="Modo de visualização">
        <button className={mode === 'present' ? 'mode-active' : ''} onClick={() => setMode('present')}><MonitorPlay size={15} /> Apresentar</button>
        <button className={mode === 'explore' ? 'mode-active' : ''} onClick={() => setMode('explore')}><Eye size={15} /> Explorar</button>
      </div>
    </header>
  )
}

function Progress({ index, total }) {
  return <div className="progress-wrap" aria-label={`Capítulo ${index + 1} de ${total}`}>
    <div className="progress-track"><motion.div className="progress-fill" animate={{ width: `${((index + 1) / total) * 100}%` }} transition={{ duration: 0.35 }} /></div>
    <span>{String(index + 1).padStart(2, '0')} <span className="muted">/ {String(total).padStart(2, '0')}</span></span>
  </div>
}

function Intro({ onStart, onExplore }) {
  return (
    <motion.section className="hero slide-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="intro">
      <div className="hero-grid" />
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> CADERNOS DE LABORATÓRIO <span className="eyebrow-year">2026</span></div>
        <h1>O FRONT-END<br />É A <span className="gradient-word">INTERFACE</span><br />DA INTELIGÊNCIA.</h1>
        <p className="hero-description">Cinco práticas. Uma jornada do streaming de respostas à IA executada localmente no navegador.</p>
        <div className="hero-actions">
          <button className="button-primary" onClick={onStart}><Play size={16} fill="currentColor" /> Iniciar apresentação <ArrowRight size={16} /></button>
          <button className="button-quiet" onClick={onExplore}>Explorar os laboratórios <ArrowDownRight size={16} /></button>
        </div>
        <div className="hero-meta">
          <span><Layers3 size={14} /> 05 LABORATÓRIOS</span><span><Gauge size={14} /> 05–07 MIN</span><span><Code2 size={14} /> REACT + IA</span>
        </div>
      </div>
      <div className="hero-art" aria-label="Ilustração abstrata de rede neural">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
        <div className="core"><div className="core-inner">AI<span>×</span>UI</div><div className="core-caption">HUMAN INTERFACE<br />SYSTEM 01</div></div>
        <div className="art-chip chip-a"><span className="chip-dot cyan-dot" /> STREAM <b>LIVE</b></div>
        <div className="art-chip chip-b"><span className="chip-dot violet-dot" /> LOCAL MODEL <b>ON</b></div>
        <div className="art-chip chip-c"><span className="chip-dot lime-dot" /> INFERENCE <b>READY</b></div>
        <div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div>
        <div className="art-coordinate">23°33' S / 46°38' W<br />FIG. 001 — INTERFACE AS SYSTEM</div>
      </div>
      <div className="hero-bottom"><span>SCROLL PARA DESCOBRIR</span><div className="scroll-line" /><span>01 — 05 / FIELD NOTES</span></div>
    </motion.section>
  )
}

function ChapterSlide({ chapter, index, onPrev, onNext, isExplore }) {
  const Icon = chapter.icon
  const isDashboard = chapter.id === 'dashboard'
  const isSentiment = chapter.id === 'sentiment'
  return (
    <motion.section className={`chapter-slide slide-shell accent-${chapter.accent}`} key={chapter.id}
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32 }}>
      <div className="chapter-heading">
        <div className="chapter-label"><span>{chapter.week}</span><span className="label-rule" /><span>FIELD NOTE {chapter.number}</span></div>
        <div className="chapter-index">{chapter.number}<span> / 05</span></div>
      </div>
      <div className="chapter-layout">
        <div className="chapter-copy">
          <div className="chapter-icon"><Icon size={22} strokeWidth={1.6} /></div>
          <h2>{chapter.title}</h2>
          <p className="chapter-subtitle">{chapter.subtitle}</p>
          <p className="chapter-summary">{chapter.summary}</p>
          <div className="tag-list">{chapter.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <div className="takeaway"><Sparkles size={16} /><p>{chapter.takeaway}</p></div>
          <div className="chapter-nav">
            <button className="icon-button" onClick={onPrev} disabled={index === 0} aria-label="Capítulo anterior"><ArrowLeft size={17} /></button>
            <span>{chapter.duration} <span className="muted">de apresentação</span></span>
            <button className="icon-button" onClick={onNext} disabled={index === chapters.length - 1} aria-label="Próximo capítulo"><ArrowRight size={17} /></button>
          </div>
        </div>
        <div className="chapter-visual">
          {isDashboard ? <DashboardVisual /> : isSentiment ? <SentimentVisual /> : <ConceptVisual chapter={chapter} />}
          <div className="visual-footer"><span><span className="live-dot" /> LAB MODULE / {chapter.number}</span><span>INTERACTIVE VIEW <ArrowUpRight size={13} /></span></div>
        </div>
      </div>
      {isExplore && <div className="detail-grid">
        {chapter.concepts.map(([title, body], i) => <article className="detail-card" key={title}><span className="detail-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
        <article className="detail-card evidence-card"><span className="detail-number">↳</span><h3>Registro do caderno</h3><p>{chapter.evidence}</p></article>
      </div>}
    </motion.section>
  )
}

function ConceptVisual({ chapter }) {
  const [active, setActive] = useState(0)
  const diagrams = {
    streaming: {
      overline: 'STREAM PIPELINE', code: 'response.body → reader.read()', steps: [
        ['01', 'REQUEST', 'POST /api/chat'], ['02', 'STREAM', 'data: {"token":"Olá"}'], ['03', 'BUFFER', 'event boundary: \\n\\n'], ['04', 'RENDER', 'React state → UI'],
      ],
      codeTitle: 'SSE / EVENT STREAM', metric: '60ms', metricLabel: 'DELAY EXAMPLE',
    },
    markdown: {
      overline: 'CONTENT PIPELINE', code: 'Markdown → React elements', steps: [
        ['01', 'PROMPT', 'Pergunta do usuário'], ['02', 'GEMINI', 'Texto + Markdown'], ['03', 'RENDER', 'MarkdownRenderer'], ['04', 'DISPLAY', 'Tabela / código / lista'],
      ],
      codeTitle: 'RESPONSE FORMAT', metric: 'GFM', metricLabel: 'TABLES + TASKS',
    },
    'local-ai': {
      overline: 'LOCAL INFERENCE', code: 'pipeline("text-generation", …)', steps: [
        ['01', 'LOAD', 'Qwen3 · ONNX q4f16'], ['02', 'WORKER', 'Inferência em background'], ['03', 'WEBGPU', 'Aceleração compatível'], ['04', 'STREAM', 'Tokens progressivos'],
      ],
      codeTitle: 'MODEL RUNTIME', metric: 'LOCAL', metricLabel: 'NO REMOTE INFERENCE API',
    },
  }
  const data = diagrams[chapter.id] || diagrams.streaming
  return (
    <div className="concept-visual">
      <div className="visual-topline"><span>{data.overline}</span><span className="mini-status"><span className="live-dot" /> SYSTEM NOMINAL</span></div>
      <div className="code-ribbon"><Code2 size={14} /><code>{data.code}</code><span>JS</span></div>
      <div className="pipeline">
        {data.steps.map(([num, title, detail], i) => <button key={num} onClick={() => setActive(i)} className={`pipeline-step ${active === i ? 'pipeline-active' : ''}`}>
          <span className="step-num">{num}</span><span className="step-main"><b>{title}</b><small>{detail}</small></span><span className="step-arrow">{i < 3 ? '↓' : '↗'}</span>
        </button>)}
      </div>
      <div className="visual-metric"><div><span className="metric-overline">{data.codeTitle}</span><p className="metric-caption">Etapa selecionada: <b>{data.steps[active][1]}</b></p></div><div className="metric-number">{data.metric}<small>{data.metricLabel}</small></div></div>
      <div className="visual-note"><CircleHelp size={14} /><span>Selecione uma etapa para explorar o fluxo.</span></div>
    </div>
  )
}

function DashboardVisual() {
  const [chart, setChart] = useState('accuracy')
  return (
    <div className="dashboard-visual">
      <div className="visual-topline"><span>MODEL OBSERVATORY</span><span className="mini-status"><span className="live-dot" /> RECORDED METRICS</span></div>
      <div className="kpi-grid">
        <div className="kpi-card"><span>ACCURACY</span><b>96<small>%</small></b><i>Final registrada</i></div>
        <div className="kpi-card"><span>VALIDATION</span><b>87<small>%</small></b><i>Validação registrada</i></div>
        <div className="kpi-card kpi-warning"><span>LOWEST F1</span><b>0.58</b><i>Classe “Misto”</i></div>
      </div>
      <div className="chart-card">
        <div className="chart-title"><div><span>PERFORMANCE / EPOCHS</span><small>Visualização demonstrativa</small></div><div className="chart-switch"><button className={chart === 'accuracy' ? 'selected' : ''} onClick={() => setChart('accuracy')}>Accuracy</button><button className={chart === 'classes' ? 'selected' : ''} onClick={() => setChart('classes')}>Classes</button></div></div>
        <div className="chart-area">
          <ResponsiveContainer width="100%" height="100%">
            {chart === 'accuracy' ? <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
              <defs><linearGradient id="cyanFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#61e6ff" stopOpacity={0.28}/><stop offset="95%" stopColor="#61e6ff" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="#25283c" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="epoch" tick={{ fill: '#8589a4', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0,100]} tick={{ fill: '#8589a4', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#101322', border: '1px solid #363951', borderRadius: 8, color: '#fff' }} />
              <Area type="monotone" dataKey="accuracy" stroke="#61e6ff" strokeWidth={2} fill="url(#cyanFill)" />
              <Area type="monotone" dataKey="validation" stroke="#b5a0ff" strokeWidth={2} fill="transparent" />
            </AreaChart> : <BarChart data={classData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid stroke="#25283c" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#8589a4', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0,1]} tick={{ fill: '#8589a4', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#101322', border: '1px solid #363951', borderRadius: 8, color: '#fff' }} />
              <Bar dataKey="f1" radius={[4,4,0,0]}>{classData.map((entry, i) => <Cell key={entry.name} fill={i === 3 ? '#ffab75' : '#61e6ff'} />)}</Bar>
            </BarChart>}
          </ResponsiveContainer>
        </div>
        <div className="chart-legend"><span><i className="legend-cyan" /> {chart === 'accuracy' ? 'Accuracy de treino' : 'F1-score por classe'}</span>{chart === 'accuracy' && <span><i className="legend-violet" /> Validação</span>}</div>
      </div>
      <p className="chart-disclaimer">* Série visual ilustrativa. Os KPIs destacados vêm do registro da Semana 9.</p>
    </div>
  )
}

function SentimentVisual() {
  const [text, setText] = useState(sentimentExamples[0].text)
  const [analyzed, setAnalyzed] = useState(0)
  const activeExample = sentimentExamples[analyzed]
  return (
    <div className="sentiment-visual">
      <div className="visual-topline"><span>SENTIMENT INTERFACE</span><span className="mini-status"><span className="live-dot" /> DEMO MODE</span></div>
      <div className="sentiment-model"><div className="model-orb"><AudioLines size={25} /></div><div><b>multilingual-sentiment</b><span>ONNX · Transformers.js</span></div><span className="model-chip">LOCAL</span></div>
      <label className="input-label" htmlFor="sentiment-text">TESTE UMA FRASE EM PORTUGUÊS</label>
      <textarea id="sentiment-text" value={text} onChange={e => setText(e.target.value)} rows={3} maxLength={240} placeholder="Digite uma frase para explorar a interface..." />
      <div className="textarea-meta"><span>{text.length}/240 caracteres</span><span>DEMO INTERATIVA</span></div>
      <div className="example-row">{sentimentExamples.map((example, i) => <button key={example.result} onClick={() => {setText(example.text); setAnalyzed(i)}}>{example.result}</button>)}</div>
      <div className={`sentiment-result result-${activeExample.color}`}><div><span>EXEMPLO SELECIONADO</span><b>{activeExample.result}</b></div><div className="result-score"><b>{[92, 89, 76][analyzed]}%</b><span>pontuação ilustrativa</span></div></div>
      <p className="chart-disclaimer">Esta é uma demonstração visual, não uma inferência real do modelo. A pontuação não garante que a interpretação esteja correta.</p>
    </div>
  )
}

function ExploreOverview({ onOpenChapter }) {
  return (
    <motion.section className="explore-overview slide-shell" key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="eyebrow"><span className="eyebrow-line" /> EXPLORATION MODE / INDEX</div>
      <div className="overview-heading"><h1>05 LABS.<br /><span className="gradient-word">ONE INTERFACE.</span></h1><p>Explore cada prática no seu ritmo. Abra um módulo para ver conceitos, tecnologias e o registro de aprendizagem.</p></div>
      <div className="chapter-cards">{chapters.map(chapter => {
        const Icon = chapter.icon
        return <button key={chapter.id} className={`chapter-card accent-${chapter.accent}`} onClick={() => onOpenChapter(chapter.id)}>
          <div className="card-top"><span>{chapter.number} / {chapter.week}</span><Icon size={19} /></div>
          <h2>{chapter.title}</h2><p>{chapter.short}</p>
          <div className="card-bottom"><div className="tag-list">{chapter.tags.slice(0,2).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><ArrowUpRight size={17} /></div>
        </button>
      })}</div>
      <div className="overview-note"><Sparkles size={17} /><p><b>Uma jornada integrada:</b> respostas em tempo real, conteúdo estruturado, visualização de métricas e inferência local — com foco em clareza, desempenho e transparência.</p></div>
    </motion.section>
  )
}

function Conclusion({ onRestart, onExplore }) {
  return (
    <motion.section className="conclusion slide-shell" key="conclusion" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="eyebrow"><span className="eyebrow-line" /> END OF TRANSMISSION / 05</div>
      <div className="conclusion-layout">
        <div><h1>MAIS QUE<br />UMA INTERFACE.<br /><span className="gradient-word">UMA EXPERIÊNCIA.</span></h1><p className="hero-description">Os cinco laboratórios mostram que construir com IA exige mais do que conectar um modelo: é preciso projetar como as pessoas entendem, acompanham e confiam nos resultados.</p>
          <div className="hero-actions"><button className="button-primary" onClick={onRestart}><RotateCcw size={16} /> Recomeçar</button><button className="button-quiet" onClick={onExplore}>Explorar os detalhes <ArrowRight size={16} /></button></div></div>
        <div className="conclusion-stack">
          {[
            ['01', 'FLUIDEZ', 'Streaming, estados e cancelamento'],
            ['02', 'CLAREZA', 'Markdown, métricas e hierarquia visual'],
            ['03', 'DESEMPENHO', 'Workers, cache e inferência local'],
            ['04', 'RESPONSABILIDADE', 'Limites, erros e transparência'],
          ].map(([n, title, text]) => <div className="conclusion-row" key={n}><span>{n}</span><div><b>{title}</b><small>{text}</small></div><Check size={15} /></div>)}
        </div>
      </div>
      <div className="end-card"><div><span className="live-dot" /> PROJECT STATUS: PRESENTATION READY</div><span>FRONT//LAB <span className="muted">· 2026</span></span></div>
    </motion.section>
  )
}

function Footer({ index, total, onPrev, onNext, isIntro, isEnd }) {
  return <footer className="bottom-bar">
    <div className="footer-left"><span className="keyboard-hint"><kbd>←</kbd><kbd>→</kbd></span><span>NAVEGAR ENTRE CAPÍTULOS</span></div>
    <div className="footer-center"><span className="footer-bracket">[</span> FRONT-END / INTELIGÊNCIA ARTIFICIAL <span className="footer-bracket">]</span></div>
    <div className="footer-right">
      <button onClick={onPrev} disabled={isIntro} aria-label="Anterior"><ArrowLeft size={16} /></button>
      <button onClick={onNext} disabled={isEnd} aria-label="Próximo"><ArrowRight size={16} /></button>
    </div>
  </footer>
}

export default function App() {
  const [mode, setMode] = useState('present')
  const [index, setIndex] = useState(-1)
  const [selectedChapter, setSelectedChapter] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const total = chapters.length
  const isIntro = index === -1
  const isEnd = index === total
  const chapter = chapters[index] || null

  const goHome = useCallback(() => { setIndex(-1); setSelectedChapter(null) }, [])
  const goNext = useCallback(() => setIndex(current => Math.min(total, current + 1)), [total])
  const goPrev = useCallback(() => setIndex(current => Math.max(-1, current - 1)), [])
  const start = useCallback(() => { setMode('present'); setIndex(0) }, [])
  const explore = useCallback(() => { setMode('explore'); setIndex(-2); setSelectedChapter(null) }, [])
  const openChapter = useCallback((id) => {
    const nextIndex = chapters.findIndex(c => c.id === id)
    setSelectedChapter(id)
    setIndex(nextIndex)
  }, [])

  useEffect(() => {
    const onKey = event => {
      if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); setIndex(current => Math.min(total, current + 1)) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); setIndex(current => Math.max(-1, current - 1)) }
      if (event.key === 'Escape') { event.preventDefault(); setIndex(-1); setSelectedChapter(null) }
      if (event.key.toLowerCase() === 'e') { setMode(current => current === 'explore' ? 'present' : 'explore'); if (index < 0) setIndex(-2) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total, index])

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.28 }
  const isOverview = mode === 'explore' && index === -2
  const visualIndex = index >= 0 && index < total ? index : 0

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <Header mode={mode} setMode={nextMode => { setMode(nextMode); if (nextMode === 'explore' && index < 0) setIndex(-2); if (nextMode === 'present' && index === -2) setIndex(-1) }} onHome={goHome} />
      <main className="main-stage">
        <AnimatePresence mode="wait" initial={false}>
          {isOverview ? <ExploreOverview key="overview" onOpenChapter={openChapter} /> :
            isIntro ? <Intro key="intro" onStart={start} onExplore={explore} /> :
            isEnd ? <Conclusion key="conclusion" onRestart={goHome} onExplore={explore} /> :
            chapter ? <ChapterSlide key={chapter.id + mode} chapter={chapter} index={index} onPrev={goPrev} onNext={goNext} isExplore={mode === 'explore'} /> : null}
        </AnimatePresence>
      </main>
      {!isIntro && !isOverview && <Progress index={visualIndex} total={total} />}
      <Footer index={index} total={total} onPrev={() => { if (isOverview) goHome(); else goPrev() }} onNext={() => { if (isOverview) start(); else goNext() }} isIntro={isIntro || isOverview} isEnd={isEnd} />
    </div>
  )
}
