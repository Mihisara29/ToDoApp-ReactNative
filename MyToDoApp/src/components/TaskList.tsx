import { FlatList, View, Text } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { TaskCard } from './TaskCard';
import NoTaskLine from '../assets/noTask/line.svg';
import { StyleSheet } from 'react-native';

//the code for list tasks

export const TaskList = () => {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <View style={{alignItems: 'center', marginTop: 150}}>
      <NoTaskLine width={60} height={10} />
      <Text style={{color: '#F0E3CA', fontSize: 20, marginVertical: 8}}>
        No Tasks
      </Text>
      <NoTaskLine width={60} height={10} />
    </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskCard task={item} />}
      keyExtractor={item => item.id}
      style={styles.taskCardList}
      
    />
  );
};

const styles = StyleSheet.create({
  taskCardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 16,
  },
});