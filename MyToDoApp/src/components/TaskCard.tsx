import {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {useTasks} from '../hooks/useTasks';
import DeleteBtn from '../assets/icons/deleteBtn.svg';
import DeleteBtnHover from '../assets/icons/deleteBtn-hover.svg';
import {StyleSheet} from 'react-native';
import Share from '../assets/icons/share.svg';
import ShareHover from '../assets/icons/share-hover.svg';
import Info from '../assets/icons/info.svg';
import InfoHover from '../assets/icons/info-hover.svg';
import Edit from '../assets/icons/edit.svg';
import EditHover from '../assets/icons/edit-hover.svg';

import {DeleteModal} from './DeleteModal';
import {ShareModal} from './ShareModal';
import {EditModal} from './EditModal';

interface Task {
  id: string;
  title: string;
  about: string;
  isCompleted: boolean;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({task}: TaskCardProps) => {
  const [isPressedDelete, setIsPressedDelete] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const {handleIsCompleted} = useTasks();
  const [isPressedShare, setIsPressedShare] = useState(false);
  const [isPressedInfo, setIsPressedInfo] = useState(false);
  const [isPressedEdit, setIsPressedEdit] = useState(false);
  
  const {
    setDeleteModalVisible,
    setSelectedTaskId,
    setEditModalVisible,
    setShareModalVisible,
  } = useTasks();

  return (
    <View style={styles.taskCardWrapper}>
      <TouchableOpacity
        onPress={() => {
          setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
        }}>
        <View style={styles.taskCard}>
          <View style={styles.titleAndAbout}>
            <Text
              style={[
                styles.taskTitle,
                task.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: 'gray',
                },
              ]}>
              {task.title}
            </Text>

            <Text
              style={[
                styles.taskAbout,
                task.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: 'gray',
                },
              ]}>
              {task.about}
            </Text>
          </View>
          <View style={styles.taskCardButtonWrapper}>
            <Pressable
              onPressIn={() =>setIsPressedDelete(true)}
              onPressOut={() =>setIsPressedDelete(false)}
              onPress={() => {
                setSelectedTaskId(task.id);
                setDeleteModalVisible(true);
              }}>
              {isPressedDelete ? <DeleteBtnHover /> : <DeleteBtn />}
            </Pressable>
            <Pressable
              style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
              onPress={() => {
                handleIsCompleted;
              }}>
              {task.isCompleted ? (
                <Text style={styles.isCompleteIcon}>Done</Text>
              ) : (
                <Text style={styles.isCompleteIcon}>Todo</Text>
              )}
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
      {expandedTaskId === task.id && (
        <View style={styles.taskActions}>
          <TouchableOpacity
            onPressIn={() => setIsPressedShare(true)}
            onPressOut={() => setIsPressedShare(false)}
            onPress={() => {setSelectedTaskId(task.id);
            setShareModalVisible(true);  
            }}>
            {isPressedShare ? <Share /> : <ShareHover />}
          </TouchableOpacity>

          <TouchableOpacity
            onPressIn={() => setIsPressedInfo(true)}
            onPressOut={() => setIsPressedInfo(false)}>
            {isPressedInfo ? <Info /> : <InfoHover />}
          </TouchableOpacity>

          <TouchableOpacity
            onPressIn={() => setIsPressedEdit(true)}
            onPressOut={
              () => {setIsPressedEdit(false)
                   setSelectedTaskId(task.id)
              }
            }
            onPress={() =>setEditModalVisible(true)}>
            {isPressedEdit ? <Edit /> : <EditHover />}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskCardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  taskCard: {
    backgroundColor: '#1F1E1B',
    borderColor: '#FF8303',
    borderWidth: 3,
    borderRadius: 8,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  titleAndAbout: {
    maxWidth: '60%',
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

  taskCardButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },

  isCompleteIcon: {
    color: '#F0E3CA',
    fontWeight: 900,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 6,
    borderRadius: 5,
    borderColor: '#A35709',
    borderWidth: 2,
  },

  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
});
