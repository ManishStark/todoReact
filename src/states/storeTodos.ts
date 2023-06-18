import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
  email: string;
  completed: false;
  __v: 0;
}
interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  addAllTodo: (todo: Todo[]) => void;
}

const useStoreTodos = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo) => {
    set((store) => ({ todos: [todo, ...store.todos] }));
  },
  deleteTodo: (todo) => {
    set((store) => ({
      todos: store.todos.filter((oldTodo) => todo.id != oldTodo.id),
    }));
  },
  updateTodo: (todo) => {
    console.log(todo);
  },
  addAllTodo: (todo) => {
    set(() => ({
      todos: todo,
    }));
  },
}));

export default useStoreTodos;
