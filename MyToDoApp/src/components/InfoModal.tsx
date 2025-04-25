import { useEffect } from 'react';
import { View, Modal, Text, StyleSheet, Pressable } from 'react-native';
import { useTasks } from '../hooks/useTasks';

export const InfoModal = () => {
  const { 
    selectedTaskId, 
    setInfoModelVisible, 
    isInfoModelVisble, 
    tasks 
  } = useTasks();

  // Find the selected task
  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  // Auto-hide after 2 seconds when visible
  useEffect(() => {
    if (isInfoModelVisble) {
      const timer = setTimeout(() => setInfoModelVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isInfoModelVisble, setInfoModelVisible]);

  const handleClose = () => setInfoModelVisible(false);

  // Format the createdAt date for display
  const formatCreatedAt = () => {
    if (!selectedTask?.createdAt) return 'Unknown creation date';
    
    try {
      const date = new Date(selectedTask.createdAt);
      return date.toLocaleString(); // Formats as "MM/DD/YYYY, HH:MM:SS AM/PM"
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date format';
    }
  };

  return (
    <Modal
      visible={isInfoModelVisble}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable 
        style={styles.modalOverlay} 
        onPress={handleClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Task Details</Text>
          
          {/* Task ID */}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Task ID:</Text>
            <Text style={styles.value}>{selectedTaskId}</Text>
          </View>
          
          {/* Creation Date */}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Created:</Text>
            <Text style={styles.value}>
              {formatCreatedAt()}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              { opacity: pressed ? 0.6 : 1 }
            ]}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1B1A17',
    padding: 20,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: '#FF8303',
  },
  title: {
    color: '#F0E3CA',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    color: '#A35709',
    fontSize: 16,
    fontWeight: '600',
    width: 80,
  },
  value: {
    color: '#F0E3CA',
    fontSize: 16,
    flex: 1,
    fontFamily: 'monospace',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 8,
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
});