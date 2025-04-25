// src/hooks/useTasks.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  title: string;
  about: string;
  isCompleted: boolean;
}

interface TaskStore {
  tasks: Task[];
  isDeleteModalVisible: boolean;
  setDeleteModalVisible: (visible: boolean) => void;
  isEditModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  isShareModalVisible: boolean;
  setShareModalVisible: (visible: boolean) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  addTask: (title: string, about: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTask: (id: string, title: string, about: string) => void;
  loadTasks: () => Promise<void>;
  handleIsCompleted: (task: Task) => void;
}

export const useTasks = create<TaskStore>((set) => ({
  tasks: [],
  isDeleteModalVisible: false,
  isEditModalVisible: false,
  isShareModalVisible: false,
  selectedTaskId: null,
  
  

  setSelectedTaskId: (id) => set({ selectedTaskId: id }),

  // Modal visibility setters
  setDeleteModalVisible: (visible) => set({ isDeleteModalVisible: visible }),
  setEditModalVisible: (visible) => set({ isEditModalVisible: visible }),
  setShareModalVisible: (visible) => set({ isShareModalVisible: visible }),

  // Load tasks from AsyncStorage
  loadTasks: async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) set({ tasks: JSON.parse(savedTasks) });
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  },

  // Add a new task
  addTask: (title, about) => {
    set((state) => {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        about: about.trim(),
        isCompleted: false,
      };
      const updatedTasks = [...state.tasks, newTask];
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Delete a task
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Toggle task completion
  toggleComplete: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      );
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Edit task
  editTask: (id, title, about) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, title, about } : task
      );
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Handle task completion (alternative to toggleComplete)
  handleIsCompleted: (task) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
}));