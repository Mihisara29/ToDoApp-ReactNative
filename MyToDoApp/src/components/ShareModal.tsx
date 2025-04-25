import {
  Linking,
  Pressable,
  View,
  Modal,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useState} from 'react';
import { useTasks } from '../hooks/useTasks';
import Toast from 'react-native-toast-message';
import Copy from '../assets/share/copy.svg';
import Vk from '../assets/share/vk.svg';
import Tele from '../assets/share/telegram(1).svg';
import Whatsapp from '../assets/share/whatsapp.svg';
import Facebook from '../assets/share/facebook.svg';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

export const ShareModal = () => {
  const { 
    isShareModalVisible,
    setShareModalVisible,
    tasks,
    selectedTaskId,
  } = useTasks();

  const taskToShare = tasks.find(task => task.id === selectedTaskId);

  //function for copy to clipboard
  const handleCopyToClipboard = () =>{
    if(taskToShare){
      const text = `Task: ${taskToShare?.title}\nAbout: ${taskToShare?.about}`;
    Clipboard.setString(text);
    setShareModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Copied!',
      text2: 'Task content copied to clipboard.',
      visibilityTime: 2000,
      position: 'bottom',
    });
    }
  }

 

//function for share in VK.
  const shareToVK = async () => {
    if (!taskToShare) return;
    
    const message = `${taskToShare.title}\n\n${taskToShare.about}`;
    const encodedMessage = encodeURIComponent(message);
    const vkUrl = `https://vk.com/share.php?comment=${encodedMessage}`;

    try {
      await Linking.openURL(vkUrl);
      setShareModalVisible(false);
    } catch (error) {
      console.error('Error sharing to VK:', error);
    }
  };

  //function for share in facebook
  const shareToFacebook = async () => {
    if (!taskToShare) return;
    
    const webUrl = `https://www.facebook.com/sharer/sharer.php?u=https://getmytodoapp.com&quote=${
      encodeURIComponent(taskToShare.title + '\n' + taskToShare.about)
    }`;

    const fbUrl = Platform.select({
      android: 'fb://facewebmodal/f?href=',
      ios: 'fb://profile',
    });

    try {
      const canOpen = await Linking.canOpenURL(fbUrl!);
      setShareModalVisible(false);
      
      if (canOpen) {
        Linking.openURL(`${fbUrl}${encodeURIComponent(webUrl)}`);
      } else {
        Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error opening Facebook:', error);
    }
  };

  //function for share in whatsapp
  const shareToWhatsApp = async () => {
    if (!taskToShare) return;
    
    const message = `${taskToShare.title}\n\n${taskToShare.about}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `whatsapp://send?text=${encodedMessage}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      setShareModalVisible(false);
      
      if (canOpen) {
        Linking.openURL(url);
      } else {
        const webUrl = `https://wa.me/?text=${encodedMessage}`;
        Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
    }
  };

  // function for share in telegram
  const shareToTelegram = async () => {
    if (!taskToShare) return;
    
    const message = `${taskToShare.title}\n\n${taskToShare.about}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `tg://msg?text=${encodedMessage}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      setShareModalVisible(false);
      
      if (canOpen) {
        Linking.openURL(url);
      } else {
        const webUrl = `https://t.me/share/url?url=&text=${encodedMessage}`;
        Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
    }
  };

  return (
    //when press the share icon of thask share icons is appeared
    <Modal visible={isShareModalVisible} transparent animationType="slide">
      <Pressable
        onPress={() => setShareModalVisible(false)}
        style={styles.shareIconsContainer}>
        <View style={styles.shareicons}>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={handleCopyToClipboard}>
            <Copy width={21} height={21} />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={shareToVK}>
            <Vk width={21} height={21} />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={shareToTelegram}>
            <Tele width={21} height={21} />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={shareToWhatsApp}>
            <Whatsapp width={21} height={21} />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={shareToFacebook}>
            <Facebook width={21} height={21} />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};


const styles = StyleSheet.create({
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
    width: '100%',
    maxWidth: 360,
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
});
