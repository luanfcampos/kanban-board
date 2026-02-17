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

## 6. Arquitetura Frontend (Componentes)

### 6.1. Mapa de Componentes
| Componente | Nível | Responsabilidade |
| :--- | :--- | :--- |
| **`KanbanBoard`** | Organismo | Container principal. Gerencia o contexto do Drag & Drop (DnDContext), renderiza a lista de Colunas e orquestra eventos. |
| **`KanbanColumn`** | Molécula | Lista vertical (Drop Zone). Renderiza o cabeçalho e a lista de Tarefas filtradas. |
| **`TaskCard`** | Molécula | Cartão da tarefa (Draggable). Exibe título, prioridade e tags. |
| **`TaskModal`** | Organismo | Modal para criação e edição. Contém formulários. |

### 6.2. Estrutura de Pastas (`src/components`)
*   **`board/`**: `KanbanBoard.tsx`, `KanbanColumn.tsx`
*   **`task/`**: `TaskCard.tsx`, `TaskModal.tsx`
*   **`ui/`**: Componentes genéricos (`Button`, `Input`, `Badge`, `Modal`).

### 6.3. Fluxo de Dados
*   **Estado Global:** Hook customizado `useKanban` (Colunas + Tarefas + Funções de Mutação).
*   **Direção:** Unidirecional (Parent -> Child).
*   **Eventos:** Callbacks sobem via props (ex: `onDelete`, `onMove`).
