import { Modal, Pressable, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { StyleSheet } from 'react-native';


export const DeleteModal = () => {
  const { 
    isDeleteModalVisible, 
    setDeleteModalVisible, 
    deleteTask, 
    selectedTaskId
  } = useTasks();

  const handleDeleteTask = () => {
    if(selectedTaskId){
      deleteTask(selectedTaskId); 
      setDeleteModalVisible(false);
    }
  };

  return (
    <Modal visible={isDeleteModalVisible} transparent animationType="fade">
      <View style={styles.deletemodalOverlay}>
        <View style={styles.deleteModalContainer}>
          <Text style={styles.deleteModalText}>Delete this task?</Text>
          <View style={styles.deleteButtonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.deleteModalButton,
                styles.deleteButtonConfirm,
                { opacity: pressed ? 0.2 : 1 },
              ]}
              onPress={handleDeleteTask} 
            >
              <Text style={styles.deleteButtonText}>Yes</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.deleteModalButton,
                { opacity: pressed ? 0.2 : 1 },
              ]}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.deleteButtonText}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create ({
  deletemodalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteModalContainer: {
    width: '80%',
    backgroundColor: '#1B1A17',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    borderTopColor: '#A35709',
    borderTopWidth: 4,
  },

  deleteModalText: {
    color: '#F0E3CA',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 20,
  },

  deleteButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
  },

  deleteModalButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
  },

  deleteButtonConfirm: {},

  deleteButtonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },

});