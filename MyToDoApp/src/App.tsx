import { useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { DeleteModal } from './components/DeleteModal';
import Toast from 'react-native-toast-message';
import { EditModal } from './components/EditModal';
import { ShareModal } from './components/ShareModal';
import {InfoModal} from './components/InfoModal';


export default function App() {
  const { loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

 // App.tsx
const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={{
      height: 60,
      width: '90%',
      backgroundColor: '#1B1A17',
      borderLeftWidth: 5,
      borderLeftColor: '#FF8303',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4,
      marginBottom: 12
    }}>
      <Text style={{ color: '#F0E3CA', fontWeight: 'bold', fontSize: 14 }}>{text1}</Text>
      {text2 ? (
        <Text style={{ color: '#F0E3CA', fontSize: 12, opacity: 0.8 }}>{text2}</Text>
      ) : null}
    </View>
  ),
  
};

  return (
    <View style={styles.container}>
      <TaskForm />
      <TaskList />
      <DeleteModal />
      <EditModal />
      <ShareModal />
      <InfoModal />
      <Toast config={toastConfig} />
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

