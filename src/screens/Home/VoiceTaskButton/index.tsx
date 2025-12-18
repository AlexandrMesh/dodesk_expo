import React, { useEffect, useRef, useState } from 'react';

import { Animated, Pressable, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
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
  isInline?: boolean; // Для использования внутри FloatingActionButtons
  onTaskAdded?: () => void; // Callback после добавления задачи
  isSmall?: boolean; // Маленький размер для подзадач
};

const VoiceTaskButton = ({ selectedList, addTask, isInline = false, onTaskAdded, isSmall = false }: VoiceTaskButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const lastTranscriptRef = useRef<string>('');
  const shouldCreateTaskRef = useRef<boolean>(false);

  // Анимация волн
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

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
      return;
    }

    // Создаем задачу
    const currentDate = new Date();
    const created_at = currentDate.getTime();
    const taskTitleTrimmed = taskTitle.trim();

    addTask({
      id: uuidv4(),
      title: taskTitleTrimmed,
      status: TODO,
      description: '',
      created_at,
      completed_at: 0,
      listId: selectedList?.id,
      language: i18n.language,
      parentId: null,
    });

    // Скроллим к верху списка после добавления задачи
    if (onTaskAdded) {
      setTimeout(() => {
        onTaskAdded();
      }, 100);
    }
  };

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
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
    // Создаем задачу если был результат
    if (shouldCreateTaskRef.current && lastTranscriptRef.current) {
      handleVoiceResult(lastTranscriptRef.current);
    }
    lastTranscriptRef.current = '';
    shouldCreateTaskRef.current = false;
  });

  // Анимация волн при записи
  useEffect(() => {
    if (isListening) {
      const createWaveAnimation = (wave: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(wave, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(wave, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        );
      };

      const animations = Animated.parallel([createWaveAnimation(wave1, 0), createWaveAnimation(wave2, 500), createWaveAnimation(wave3, 1000)]);

      animations.start();

      return () => {
        animations.stop();
        wave1.setValue(0);
        wave2.setValue(0);
        wave3.setValue(0);
      };
    }
  }, [isListening, wave1, wave2, wave3]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (isListening) {
        ExpoSpeechRecognitionModule.stop();
      }
    };
  }, [isListening]);

  const startListening = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        return false;
      }

      // Вибрация при старте записи
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      lastTranscriptRef.current = '';
      shouldCreateTaskRef.current = true;
      setIsListening(true);

      ExpoSpeechRecognitionModule.start({
        lang: i18n.language === 'ru' ? 'ru-RU' : 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        requiresOnDeviceRecognition: false,
      });

      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      shouldCreateTaskRef.current = false;
      return false;
    }
  };

  const stopListening = () => {
    if (isListening) {
      shouldCreateTaskRef.current = true;
      ExpoSpeechRecognitionModule.stop();
    }
  };

  const handlePressIn = () => {
    // Сразу начинаем запись без задержки
    startListening();
  };

  const handlePressOut = () => {
    // Останавливаем запись при отпускании
    if (isListening) {
      stopListening();
    }
  };

  const renderWave = (wave: Animated.Value, index: number) => {
    const scale = wave.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.8 + index * 0.2],
    });

    const opacity = wave.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.6, 0.3, 0],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.wave,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    );
  };

  const containerStyle = isSmall ? styles.smallContainer : isInline ? styles.inlineContainer : styles.container;
  const buttonStyle = isSmall ? styles.smallVoiceButton : styles.voiceButton;
  const iconSize = isSmall ? 20 : 28;

  const renderSmallWave = (wave: Animated.Value, index: number) => {
    const scale = wave.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.5 + index * 0.15],
    });

    const opacity = wave.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.6, 0.3, 0],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.smallWave,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    );
  };

  return (
    <View style={containerStyle}>
      {isListening && (
        <>
          {isSmall ? (
            <>
              {renderSmallWave(wave1, 0)}
              {renderSmallWave(wave2, 1)}
              {renderSmallWave(wave3, 2)}
            </>
          ) : (
            <>
              {renderWave(wave1, 0)}
              {renderWave(wave2, 1)}
              {renderWave(wave3, 2)}
            </>
          )}
        </>
      )}
      <Pressable style={[buttonStyle, isListening && styles.voiceButtonActive]} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={iconSize} color={isListening ? colors.neutral_white : colors.neutral_light} />
      </Pressable>
    </View>
  );
};

export default VoiceTaskButton;
