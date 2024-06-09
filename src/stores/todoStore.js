import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(todo) {
      this.todos.push({ text: todo, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodoStatus(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
  },
  getters: {
    remainingTodos: (state) =>
      state.todos.filter((todo) => !todo.completed).length,
  },
});
