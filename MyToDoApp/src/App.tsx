import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { DeleteModal } from './components/DeleteModal';
import Toast from 'react-native-toast-message';
import { EditModal } from './components/EditModal';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const { loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <TaskForm />
      <TaskList />
      <DeleteModal />
      <EditModal />
      <ShareModal />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#242320',
  },
});