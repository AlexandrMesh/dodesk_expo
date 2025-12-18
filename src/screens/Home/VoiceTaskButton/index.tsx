import { Ionicons } from '@expo/vector-icons';
import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TODO } from '~constants/statuses';
import colors from '~styles/colors';
import i18n from '~translations/i18n';
import { IList } from '~types/lists';
import { ITask } from '~types/tasks';
import styles from './styles';

type VoiceTaskButtonProps = {
  selectedList: IList;
  addTask: (params: ITask) => unknown;
};

const VoiceTaskButton = ({ selectedList, addTask }: VoiceTaskButtonProps) => {
  const { t } = useTranslation(['tasks', 'common']);
  const [isListening, setIsListening] = useState(false);

  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results[0]?.transcript || '';
    if (transcript) {
      handleVoiceResult(transcript);
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.error('Speech recognition error:', event);
    setIsListening(false);
    Alert.alert(t('common:error'), t('tasks:voiceError'));
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
  });

  const handleVoiceResult = (transcript: string) => {
    setIsListening(false);
    
    // Парсим команду: "добавь задачу НАЗВАНИЕ", "создай задачу НАЗВАНИЕ", "задача НАЗВАНИЕ" или просто "НАЗВАНИЕ"
    let taskTitle = transcript;
    
    // Удаляем начальные фразы типа "добавь задачу", "создай задачу", "новая задача", "задача"
    const patterns = [
      /^добавь задачу\s+/i,
      /^создай задачу\s+/i,
      /^новая задача\s+/i,
      /^задача\s+/i,
      /^add task\s+/i,
      /^create task\s+/i,
      /^new task\s+/i,
      /^task\s+/i,
    ];
    
    for (const pattern of patterns) {
      taskTitle = taskTitle.replace(pattern, '');
    }

    if (taskTitle.trim().length < 2) {
      Alert.alert(t('common:error'), t('tasks:voiceTaskTooShort'));
      return;
    }

    // Создаем задачу
    const currentDate = new Date();
    const created_at = currentDate.getTime();
    addTask({
      id: uuidv4(),
      title: taskTitle.trim(),
      status: TODO,
      description: '',
      created_at,
      completed_at: 0,
      listId: selectedList?.id,
      language: i18n.language,
      parentId: null
    });

    Alert.alert(t('common:success'), `${t('tasks:voiceTaskAdded')}: "${taskTitle.trim()}"`);
  };

  const startListening = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        Alert.alert(t('common:error'), t('tasks:voicePermissionDenied'));
        return;
      }

      setIsListening(true);
      ExpoSpeechRecognitionModule.start({
        lang: i18n.language === 'ru' ? 'ru-RU' : 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      Alert.alert(t('common:error'), t('tasks:voiceError'));
    }
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
    setIsListening(false);
  };

  const handlePress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Pressable style={[styles.voiceButton, isListening && styles.voiceButtonActive]} onPress={handlePress}>
      <Ionicons 
        name={isListening ? 'stop-circle' : 'mic'} 
        size={28} 
        color={isListening ? colors.error : colors.neutral_light} 
      />
    </Pressable>
  );
};

export default VoiceTaskButton;
