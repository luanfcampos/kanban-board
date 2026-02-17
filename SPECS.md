# Especificação do Produto: Kanban Board

## 1. Objetivo
Desenvolver uma aplicação de gerenciamento de tarefas visual, intuitiva e performática, que permita aos usuários organizar fluxos de trabalho pessoais. O foco é na experiência do usuário (UX), fluidez das animações (Drag & Drop) e persistência local de dados, eliminando a necessidade de configuração de backend.

## 2. Funcionalidades Principais (MVP)
*   **Gestão de Tarefas (CRUD):**
    *   Criação rápida de tarefas.
    *   Edição de detalhes (título, descrição, prioridade, tags).
    *   Exclusão de tarefas.
*   **Drag and Drop (DnD):**
    *   Arrastar tarefas entre colunas.
    *   Reordenar tarefas dentro da mesma coluna.
*   **Propriedades da Tarefa:**
    *   Título (Obrigatório).
    *   Descrição (Opcional).
    *   Prioridade (Baixa, Média, Alta).
    *   Tags/Etiquetas (ex: Design, Dev, Bug).
*   **Gestão de Colunas:**
    *   Edição de título da coluna.
    *   Adicionar novas colunas.
    *   Excluir colunas.
*   **Persistência de Dados:**
    *   Salvamento automático via `localStorage`.
*   **Interface:**
    *   Design limpo utilizando Tailwind CSS v4.
    *   Layout responsivo.

## 3. Fora do Escopo (nesta versão)
*   Autenticação de usuários (Login/Signup).
*   Banco de dados remoto ou API Backend.
*   Colaboração em tempo real (WebSockets).
*   Upload de arquivos/anexos.
*   Histórico de alterações.
*   Subtarefas aninhadas.

## 4. Colunas Iniciais
Ao iniciar sem dados, o board deve apresentar:
1.  **A Fazer** (To Do) - *Slate/Gray*
2.  **Em Progresso** (In Progress) - *Blue/Indigo*
3.  **Concluído** (Done) - *Green/Emerald*

## 5. Regras Gerais de Uso
*   **Validação:** Uma tarefa não pode ser criada sem título.
*   **Fluxo:** Livre (usuário move para qualquer direção).
*   **Feedback Visual:**
    *   Opacidade reduzida no item arrastado.
    *   Realce na zona de destino (drop zone).
*   **Performance:** Animações fluidas (60fps).
