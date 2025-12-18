import { Ionicons } from '@expo/vector-icons';
import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import React, { useRef, useState } from 'react';
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
  const lastTranscriptRef = useRef<string>('');
  const shouldCreateTaskRef = useRef<boolean>(false);

  useSpeechRecognitionEvent('result', (event) => {
    // Сохраняем последний результат, но НЕ создаем задачу сразу
    const transcript = event.results[0]?.transcript || '';
    if (transcript) {
      lastTranscriptRef.current = transcript;
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.error('Speech recognition error:', event);
    setIsListening(false);
    lastTranscriptRef.current = '';
    shouldCreateTaskRef.current = false;
    Alert.alert(t('common:error'), t('tasks:voiceError'));
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
    // Создаем задачу только если пользователь отпустил кнопку намеренно
    if (shouldCreateTaskRef.current && lastTranscriptRef.current) {
      handleVoiceResult(lastTranscriptRef.current);
      lastTranscriptRef.current = '';
    }
    shouldCreateTaskRef.current = false;
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
        return false;
      }

      lastTranscriptRef.current = '';
      shouldCreateTaskRef.current = true;
      setIsListening(true);
      
      ExpoSpeechRecognitionModule.start({
        lang: i18n.language === 'ru' ? 'ru-RU' : 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
      });
      
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      shouldCreateTaskRef.current = false;
      Alert.alert(t('common:error'), t('tasks:voiceError'));
      return false;
    }
  };

  const stopListening = () => {
    shouldCreateTaskRef.current = true;
    ExpoSpeechRecognitionModule.stop();
  };

  const handlePressIn = () => {
    // Начинаем запись при нажатии
    startListening();
  };

  const handlePressOut = () => {
    // Останавливаем запись при отпускании
    if (isListening) {
      stopListening();
    }
  };

  return (
    <Pressable 
      style={[styles.voiceButton, isListening && styles.voiceButtonActive]} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Ionicons 
        name={isListening ? 'mic' : 'mic-outline'} 
        size={28} 
        color={isListening ? colors.neutral_white : colors.neutral_light} 
      />
    </Pressable>
  );
};

export default VoiceTaskButton;
