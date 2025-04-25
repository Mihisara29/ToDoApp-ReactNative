import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import AddBtn from '../assets/icons/addBtn.svg';
import AddBtnHover from '../assets/icons/addBtn-hover.svg';
import { StyleSheet } from 'react-native';

//the code for add inputs
export const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (title.trim() && about.trim()) {
      addTask(title, about);
      setTitle('');
      setAbout('');
    }
  };

  return (
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
  );
};

const styles = StyleSheet.create({

  inputPartsAndAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
   
  },

  inputParts:{

    flex:1,
    

  },
  
  input: {
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
    paddingVertical: 8,
    marginRight: 12,
    marginBottom:5,
  },
  
  


  addBtn: {
    marginBottom:5,
  },


});