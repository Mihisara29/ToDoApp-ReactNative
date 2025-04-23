import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import AddBtn from './assets/icons/addBtn.svg';
import AddBtnHover from './assets/icons/addBtn-hover.svg';
import DeleteBtn from './assets/icons/deleteBtn.svg';
import DeleteBtnHover from './assets/icons/deleteBtn-hover.svg';
import NoTaskLine from './assets/noTask/line.svg';
import Edit from './assets/icons/edit.svg';
import EditHover from './assets/icons/edit-hover.svg';
import Share from './assets/icons/share.svg';
import ShareHover from './assets/icons/share-hover.svg';
import Info from './assets/icons/info.svg';
import InfoHover from './assets/icons/info-hover.svg';
import Copy from './assets/share/copy.svg';
import Vk from './assets/share/vk.svg';
import Whatsapp from './assets/share/whatsapp.svg';
import Facebook from './assets/share/facebook.svg';
import Tele from './assets/share/telegram(1).svg';
import Shares from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';








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
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [isPressedShare,setIsPressedShare] = useState(false);
  const [isPressedInfo,setIsPressedInfo] = useState(false);
  const [isPressedEdit,setIsPressedEdit] = useState(false);
  const[editModalVisible,setEditModalVisible] = useState(false);
  const[editTitle,setEditTitle] = useState('');
  const[editAbout,setEditAbout] = useState('');
  const[editingtaskId,setEditingTaskId] = useState<string | null>(null);
  const[isshareModalVisible,setShareModalVisible] = useState(false);
  const[selectedTask,setSelectedTask] = useState<Task|null>(null);


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

  const openEditModal = (task: Task) => {
    setEditTitle(task.title);
    setEditAbout(task.about);
    setEditingTaskId(task.id);
    setEditModalVisible(true);

  }

  const handleSaveEdit = () => {
    if (editingtaskId) {
      const updatedTasks = tasks.map(task =>
        task.id === editingtaskId
          ? { ...task, title: editTitle, about: editAbout }
          : task
      );
      setTasks(updatedTasks);
      setEditModalVisible(false);
      setEditingTaskId(null);
      setEditTitle('');
      setEditAbout('');
    }
  };

  const openShareModal = (task: Task) => {
    setSelectedTask(task);
    setShareModalVisible(true);
  };

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

      {}
      <View>
        No Tasks
      </View>

      {tasks.length === 0 ? (
  <View style={{ alignItems: 'center', marginTop: 150 }}>
    <NoTaskLine width={60} height={10} />
    <Text style={{ color: '#F0E3CA', fontSize: 20, marginVertical: 8 }}>No Tasks</Text>
    <NoTaskLine width={60} height={10} />
  </View>
) : (
  <FlatList
    data={tasks}
    renderItem={({ item }) => (
      <View style={styles.taskCardWrapper}>
        <TouchableOpacity
        onPress={()=>{
          setExpandedTaskId(expandedTaskId === item.id ? null : item.id)
        }}
        >
        <View style={styles.taskCard}>
        <View style={styles.titleAndAbout}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskAbout}>{item.about}</Text>
        </View>
        <TouchableOpacity
          onPressIn={() => setIsPressedDelete(true)}
          onPressOut={() => setIsPressedDelete(false)}
          onPress={() => handleDeleteTask(item.id)}
        >
          {isPressedDelete ? <DeleteBtnHover /> : <DeleteBtn />}
        </TouchableOpacity>
      </View>
        </TouchableOpacity>
      {expandedTaskId === item.id && (
               <View style={styles.taskActions}>
               <TouchableOpacity
                onPressIn={()=>setIsPressedShare(true)}
                onPressOut={()=>setIsPressedShare(false)}
                onPress={() => openShareModal(item)}
               >
                {isPressedShare ? <Share />: <ShareHover />}
               </TouchableOpacity> 

               <TouchableOpacity
                onPressIn={()=>setIsPressedInfo(true)}
                onPressOut={()=>setIsPressedInfo(false)}
               >
                {isPressedInfo ? <Info />: <InfoHover />}
               </TouchableOpacity>
               
               <TouchableOpacity
                onPressIn={()=>setIsPressedEdit(true)}
                onPressOut={()=>setIsPressedEdit(false)}
                onPress={()=> openEditModal(item)}
               >
                {isPressedEdit ? <Edit />: <EditHover />}
               </TouchableOpacity>
               
             </View>
      )}
 
      </View>

    )}
    keyExtractor={item => item.id}
    style={styles.taskCardList}
  />
)}
<Modal visible={editModalVisible} transparent animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.editingTitle}
        placeholder='Edit title...'
        placeholderTextColor="#F0E3CA"
        value={editTitle}
        onChangeText={setEditTitle}
      />
      <TextInput
        style={styles.editingAbout}
        placeholder='Edit about...'
        placeholderTextColor="#F0E3CA"
        multiline
        value={editAbout}
        onChangeText={setEditAbout}
      />
      <View style={styles.buttonRow}>
      <Pressable style={styles.modalButton} onPress={() => setEditModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.modalButton}
        onPress={handleSaveEdit}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>
{isshareModalVisible?<Pressable
onPress={()=>setShareModalVisible(false)}
style={styles.shareIconsContainer}>
  <View style={styles.shareicons}>
  <Pressable
   style={styles.iconContainer}><Copy width={21} height={21} /></Pressable>
  <Pressable style={styles.iconContainer}><Vk width={21} height={21} /></Pressable>
  <Pressable style={styles.iconContainer}><Tele width={21} height={21} /></Pressable>
  <Pressable style={styles.iconContainer}><Whatsapp width={21} height={21} /></Pressable>
  <Pressable style={styles.iconContainer}><Facebook width={21} height={21} /></Pressable>
  </View>

</Pressable>:null}


   

    </View>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#242320', 
  },

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
    left: '4.49%', 
    right: '79.4%', 
    top: '21.88%', 
    bottom: '21.88%', 
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
  top: 126,
  },

  taskActions:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    left:250,
  },

  taskCardWrapper:{
    display:'flex',
    flexDirection:'column',
    gap:5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContainer: {
    width: 360,
    backgroundColor: '#1B1A17',
    borderRadius: 8,
    padding: 18,
    top:200
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
    alignSelf:'center',
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

  shareIconsContainer: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    zIndex: 999,
  },
  
  shareicons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingVertical: 14,
    backgroundColor: '#1B1A17',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: 360,
    height: 76,
  },
  
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#23221F',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 21,
    height: 21,
    tintColor: '#F0E3CA', 
  }
});
