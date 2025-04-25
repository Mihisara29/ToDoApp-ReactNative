import { useState, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { useTasks } from '../hooks/useTasks';

export const EditModal = () => {
  const { 
    editTask,
    isEditModalVisible,
    setEditModalVisible,
    selectedTaskId,
    tasks
  } = useTasks();
  
  // State for editable fields
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');

  // Find the task being edited
  const editingTask = tasks.find(task => task.id === selectedTaskId);

  // Initialize form fields when task changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setAbout(editingTask.about);
    }
  }, [editingTask]);
  
  //Function for the save edit-task
  const handleSave = () => {
    if (selectedTaskId) {
      editTask(selectedTaskId, title, about);
      setEditModalVisible(false);
    }
  };

  return (
    //popup massage for editing
    <Modal visible={isEditModalVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.editingTitle}
            placeholder="Edit title..."
            placeholderTextColor="#F0E3CA"
            value={title}  
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.editingAbout}
            placeholder="Edit about..."
            placeholderTextColor="#F0E3CA"
            multiline
            value={about} 
            onChangeText={setAbout}
          />
          <View style={styles.buttonRow}>
           <Pressable 
              style={({ pressed }) => [
                styles.modalButton,
                { opacity: pressed ? 0.2 : 1 }
              ]}
              onPress={handleSave}
              disabled={!title.trim()} 
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
               style={({ pressed }) => [
                styles.modalButton,
                { opacity: pressed ? 0.2 : 1 }
              ]}
              onPress={() => setEditModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalContainer: {
    width: '90%',
    backgroundColor: '#1B1A17',
    borderRadius: 8,
    padding: 18,
  },

  editingTitle: {
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    color: '#F0E3CA',
    fontSize: 14,
    marginBottom: 8,
    textAlignVertical: 'top',
  },

  editingAbout: {
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
    height: 250,
    paddingHorizontal: 10,
    color: '#F0E3CA',
    fontSize: 14,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 12,
  },

  modalButton: {
    width: 64,
    height: 24,
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#D9D9D9',
    fontSize: 10,
    textAlign: 'center',
  },


});