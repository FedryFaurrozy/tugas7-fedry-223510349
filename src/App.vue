<template>
  <div id="app">
    <header
      style="background-color: rgb(48, 47, 47); color: white; padding: 10px 0"
    >
      <marquee behavior="scroll" direction="left" style="font-size: 20px">
        SELAMAT DATANG DI TUGAS AKHIR PBK
      </marquee>
    </header>
    <div
      class="container"
      style="
        font-family: Arial, sans-serif;
        margin: 20px auto;
        max-width: 600px;
      "
    >
      <h1
        class="title"
        style="text-align: center; font-size: 36px; font-weight: bold"
      >
        DAFTAR TUGAS
      </h1>
      <hr style="border: 1px solid #ccc" />
      <div
        class="input-group"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        "
      >
        <input
          type="text"
          class="form-control"
          placeholder="Tambahkan item..."
          v-model="newTask"
          @keyup.enter="addItem"
          style="
            flex: 1;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-right: 10px;
          "
        />
        <button
          class="btn btn-success animate-button"
          @click="addItem"
          style="
            border-radius: 5px;
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
          "
        >
          TAMBAH
        </button>
      </div>
      <div
        class="todo-table"
        style="border: 1px solid #ccc; border-radius: 5px; overflow: hidden"
      >
        <div
          class="table-header"
          style="display: flex; background-color: #f0f0f0; padding: 10px"
        >
          <div
            class="table-cell"
            style="flex: 1; padding: 10px; font-size: 18px"
          >
            Tugas
          </div>
          <div
            class="table-cell"
            style="flex: 1; padding: 10px; font-size: 18px"
          >
            Aksi
          </div>
        </div>
        <div class="table-body" style="display: grid">
          <div
            class="table-row"
            v-for="(task, index) in tasks"
            :key="index"
            :class="{ 'even-row': index % 2 === 0, completed: task.completed }"
            style="display: flex; border-top: 1px solid #ccc; flex-wrap: wrap"
          >
            <div
              class="table-cell"
              :class="{ 'completed-cell': task.completed }"
              style="flex: 1; padding: 10px; font-size: 18px; {{ task.completed ? 'text-decoration: line-through;' : '' }}"
            >
              {{ task.value }}
            </div>
            <div
              class="table-cell"
              style="flex: 1; padding: 10px; display: flex; flex-wrap: wrap"
            >
              <button
                class="btn btn-primary"
                @click="toggleCompleted(index)"
                style="
                  padding: 10px 20px;
                  border-radius: 5px;
                  cursor: pointer;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  margin-bottom: 5px;
                "
              >
                {{ task.completed ? "Batal" : "Selesai" }}
              </button>
              <button
                class="btn btn-info"
                @click="editItem(index)"
                style="
                  padding: 10px 20px;
                  border-radius: 5px;
                  cursor: pointer;
                  background-color: #17a2b8;
                  color: white;
                  border: none;
                  margin-bottom: 5px;
                "
              >
                Edit
              </button>
              <button
                class="btn btn-danger"
                @click="deleteTask(index)"
                style="
                  padding: 10px 20px;
                  border-radius: 5px;
                  cursor: pointer;
                  background-color: #dc3545;
                  color: white;
                  border: none;
                  margin-bottom: 5px;
                "
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="total-tugas-selesai">
        <p>Total Tugas Selesai: {{ totalTugasSelesai }}</p>
        <p>Total Tugas Belum Selesai: {{ incompleteTaskCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
  }),
});

export const useTaskActions = () => {
  const store = useTaskStore();

  const addTask = (newTask) => {
    store.tasks.push(newTask);
  };

  const deleteTask = (index) => {
    store.tasks.splice(index, 1);
  };

  return { addTask, deleteTask };
};

export const useTaskGetters = () => {
  const store = useTaskStore();

  const getIncompleteTaskCount = () => {
    return store.tasks.filter((task) => !task.completed).length;
  };

  return { getIncompleteTaskCount };
};

export default {
  name: "App",
  data() {
    return {
      newTask: "",
    };
  },
  computed: {
    tasks() {
      return useTaskStore().tasks;
    },
    totalTugasSelesai() {
      return this.tasks.filter((task) => task.completed).length;
    },
    incompleteTaskCount() {
      return useTaskGetters().getIncompleteTaskCount();
    },
  },
  methods: {
    addItem() {
      if (this.newTask.trim() !== "") {
        const newItem = {
          value: this.newTask.trim(),
          completed: false,
        };
        useTaskActions().addTask(newItem);
        this.newTask = "";
      }
    },
    deleteTask(index) {
      useTaskActions().deleteTask(index);
    },
    editItem(index) {
      const editedTodo = prompt("Edit the todo:");
      if (editedTodo !== null && editedTodo.trim() !== "") {
        this.tasks[index].value = editedTodo.trim();
      }
    },
    toggleCompleted(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #161616;
}
.animate-button {
  transition: all 0.3s ease;
}
.animate-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
.menu {
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu li {
  position: absolute;
  left: 0;
  list-style: none;
  transform: rotate(0deg) translateX(100px);
  transform-origin: 130px;
  transition: 0.5s;
  transition-delay: calc(0.1s * var(--i));
}
.menu.active li {
  transform: rotate(calc(360deg / 8 * var(--i)));
}
.menu a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  text-decoration: none;
  font-size: 22px;
  border-radius: 50%;
  transform: rotate(calc(360deg / -8 * var(--i)));
  transition: 1s;
  color: transparent;
  transition-delay: 0.5s;
  filter: drop-shadow(0 0 2px var(--clr));
}
.menu.active a {
  color: var(--clr);
}
.menu a::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--clr);
  transform: rotate(calc(90deg * var(--i))) translate(0, 25px);
  transition: width 0.5s, height 0.5s, transform 0.5s;
  transition-delay: 0.5s, 1s, 1.5s;
}
</style>
