import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AddBtn from './assets/icons/addBtn.svg';
import AddBtnHover from './assets/icons/addBtn-hover.svg';
import DeleteBtn from './assets/icons/deleteBtn.svg';
import DeleteBtnHover from './assets/icons/deleteBtn-hover.svg';

export default function App() {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  type Task = {
    id: string;
    title: string;
    about: string;
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedDelete,setIsPressedDelete] = useState(false);

  const handleAddTask = () => {
    if (title.trim() && about.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        about: about.trim(),
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setAbout('');
    }
  };

  const handleDeleteTask = (id:string) =>{
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputPartsAndAddButton}>
        <View style={styles.inputParts}>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            placeholderTextColor="#F0E3CA"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="About..."
            placeholderTextColor="#F0E3CA"
            value={about}
            onChangeText={setAbout}
          />
        </View>

        <View style={styles.addBtn}>
          <TouchableOpacity
            onPress={handleAddTask}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            >
            {isPressed ? (
              <AddBtnHover height={90} width={90} />
            ) : (
              <AddBtn height={90} width={90} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <View style={styles.taskCard}>
            <View style={styles.titleAndAbout}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskAbout}>{item.about}</Text>
            </View>  
            <TouchableOpacity
            onPressIn={()=>{setIsPressedDelete(true)}}
            onPressOut={()=>{setIsPressedDelete(false)}}
            onPress={() => handleDeleteTask(item.id)}
            > {isPressedDelete ? (<DeleteBtnHover />):(<DeleteBtn />)}</TouchableOpacity>
            
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.taskCardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 267,
    backgroundColor: '#242320',
    borderColor: '#FF8303',
    borderWidth: 2,
    borderRadius: 4,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: 'rgba(240, 227, 202, 0.64)',
    left: '4.49%', // left percentage for positioning
    right: '79.4%', // right percentage for positioning
    top: '21.88%', // top percentage for positioning
    bottom: '21.88%', // bottom percentage for positioning
    alignItems: 'center',
    display: 'flex',
    marginBottom: 5,
  },

  inputPartsAndAddButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    gap: 18,
    width: 345,
    height: 70,
    left: 23,
    top: 23,
  },

  addBtn: {
    marginTop: 25,
  },

  taskCard: {
    backgroundColor: '#1F1E1B',
    borderColor: '#FF8303',
    borderWidth: 3,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 24,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  
  taskTitle: {
    color: '#F0E3CA',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  taskAbout: {
    color: '#F0E3CA',
    fontSize: 14,
    opacity: 1,
  },

  taskCardList: {
  display:'flex',
  flexDirection:'column',
  padding: 0,
  gap: 16,
  position: 'absolute',
  width: '100%',
  height: 248,
  top: 126,
  },


  
});
