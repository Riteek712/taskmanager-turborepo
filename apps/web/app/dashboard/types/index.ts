export interface Todo {
    id: number;
    task: string;
    description: string;
    status: 'ACTIVE' | 'WORKING' | 'DONE';
    deadline?: string;
    createdAt?: string;
    updatedAt?: string;
    userEmail?: string;
  }
  
  export type TodoStatus = 'ACTIVE' | 'WORKING' | 'DONE';