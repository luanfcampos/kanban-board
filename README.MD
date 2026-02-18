# Kanban Board (React + Vite + Tailwind v4)

Um gerenciador de tarefas visual, intuitivo e performático estilo **Kanban**, desenvolvido para organizar fluxos de trabalho pessoais. O projeto foca na experiência do usuário (UX), fluidez das animações e persistência local de dados, eliminando a necessidade de um backend.

## 🚀 Funcionalidades

- **Quadro Visual:** Organização em colunas (To Do, In Progress, Done).
- **Drag & Drop (Arrastar e Soltar):** Mova tarefas entre colunas ou reordene-as facilmente.
- **Gestão de Tarefas (CRUD):**
  - Criação rápida de cards.
  - Edição de detalhes (Título, Descrição e Prioridade).
  - Exclusão de tarefas com confirmação.
- **Persistência de Dados:** Todo o estado é salvo automaticamente no `localStorage` do navegador. Seus dados permanecem lá mesmo se fechar a aba.
- **Interface Moderna:** Design limpo e responsivo utilizando **Tailwind CSS v4**.
- **Sistema de Prioridades:** Classificação visual (Baixa, Média, Alta) com cores distintas.

## 🛠️ Tecnologias Utilizadas

- **React 19**: Biblioteca UI moderna e performática.
- **TypeScript**: Para tipagem estática e segurança do código.
- **Vite**: Build tool ultrarrápida.
- **Tailwind CSS v4**: Nova versão do framework CSS, configurado via `@import "tailwindcss";` e variáveis CSS nativas.
- **Native Drag & Drop API**: Implementação leve de arrastar e soltar sem bibliotecas externas pesadas.

## 📂 Estrutura do Projeto

```bash
src/
├── components/
│   ├── board/        # Componentes estruturais (Board, Coluna)
│   └── task/         # Componentes da tarefa (Card, Modal de Edição)
├── hooks/            # Lógica de estado e persistência (useKanban)
├── types/            # Definições de tipos TypeScript
├── App.tsx           # Layout principal
└── main.tsx          # Ponto de entrada
```

## 🔧 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/kanban-board.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Rode o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   O projeto estará rodando geralmente em `http://localhost:5173`.

## 🚧 Status do Desenvolvimento

O projeto está funcional (MVP), com as seguintes observações:

- **Funcional:** Criação, Edição, Exclusão e Movimentação de tarefas.
- **Em Construção:** A funcionalidade de *Adicionar Nova Coluna* é atualmente um placeholder visual e será implementada em futuras atualizações.

## 📝 Licença

Este projeto é de uso livre para fins de estudo e portfólio.
