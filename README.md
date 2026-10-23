# FRONT//LAB — Cinco práticas de Front-End e IA

Uma apresentação web interativa e um miniportfólio sobre cinco cadernos de laboratório de Front-End, React e Inteligência Artificial.

## Tecnologias

- HTML5 + CSS3 + JavaScript moderno
- React + Vite
- Motion para transições e microanimações
- Recharts para visualizações demonstrativas
- Lucide React para ícones

## Requisitos

- Node.js 20.19+ recomendado
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra o endereço local exibido pelo Vite no terminal.

## Validar a compilação

```bash
npm run build
npm run preview
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos deste projeto.
2. Em **Settings → Pages**, configure a publicação por GitHub Actions ou use um workflow do Vite.
3. Se o repositório for publicado em um subcaminho, ajuste `base` em `vite.config.js` para `'/NOME-DO-REPOSITORIO/'`.
4. Rode `npm run build` e confirme que a pasta `dist` foi gerada.

## Navegação

- Use as setas **← / →** ou **Page Up / Page Down** no modo apresentação.
- Pressione **Esc** para voltar ao início.
- Alterne entre **Apresentar** e **Explorar** no cabeçalho.
- A interface respeita a preferência de movimento reduzido do sistema.

## Conteúdo

1. Chatbot com streaming — SSE, buffer de eventos, cancelamento e latência.
2. IA + Markdown — Gemini, renderização de Markdown e segurança da chave no backend.
3. Dashboard de métricas — KPIs, Recharts e avaliação por classe.
4. IA local no navegador — Qwen, ONNX, Transformers.js, Web Workers e WebGPU.
5. Análise de sentimentos — NLP, agrupamento de classes, debounce e limites de interpretação.

## Nota sobre fidelidade acadêmica

As métricas de Accuracy (96%), Validation Accuracy (87%) e F1-score da classe “Misto” (0,58) são apresentadas como valores registrados no material da Semana 9, não como resultados de uma nova execução feita por este site. Os gráficos ilustrativos na interface são explicitamente demonstrativos. A aplicação não executa os modelos de IA dos cadernos nem chama APIs externas.

## Personalização

Edite `src/data/chapters.js` para alterar textos, duração estimada ou exemplos. O componente principal está em `src/App.jsx`; a identidade visual está em `src/styles.css`.
