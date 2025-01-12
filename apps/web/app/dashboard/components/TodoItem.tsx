// apps/frontend/src/app/dashboard/components/TodoItem.tsx

interface Todo {
    id: number;
    task: string;
    description: string;
    status: string;
  }
  
  interface TodoItemProps {
    todo: Todo;
  }
  
  export const TodoItem = ({ todo }: TodoItemProps) => {
    return (
      <div className="todo-item">
        <h2>{todo.task}</h2>
        <p>{todo.description}</p>
        <span>Status: {todo.status}</span>
      </div>
    );
  };
  