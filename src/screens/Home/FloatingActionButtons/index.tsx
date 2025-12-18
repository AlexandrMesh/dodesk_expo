import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

import { ADD_TASK_ROUTE } from '~constants/routes';
import { TODO } from '~constants/statuses';
import colors from '~styles/colors';
import { IList } from '~types/lists';
import { ITask } from '~types/tasks';
import VoiceTaskButton from '../VoiceTaskButton';

import styles from './styles';

type FloatingActionButtonsProps = {
  selectedList: IList;
  addTask: (task: ITask) => unknown;
};

const FloatingActionButtons = ({ selectedList, addTask }: FloatingActionButtonsProps) => {
  const navigation = useNavigation<any>();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Анимация для кнопок
  const voiceButtonAnimation = useRef(new Animated.Value(0)).current;
  const textButtonAnimation = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.parallel([
      // Анимация выезда кнопки голоса
      Animated.spring(voiceButtonAnimation, {
        toValue,
        useNativeDriver: true,
        tension: 50,
        friction: 9,
        delay: isExpanded ? 50 : 0, // При закрытии - задержка для голоса
      }),
      // Анимация выезда кнопки текста
      Animated.spring(textButtonAnimation, {
        toValue,
        useNativeDriver: true,
        tension: 50,
        friction: 9,
        delay: isExpanded ? 0 : 50, // При открытии - задержка для текста
      }),
      // Анимация оверлея (более плавная)
      Animated.timing(overlayOpacity, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    setIsExpanded(!isExpanded);
  };

  const handleTextButton = () => {
    toggleMenu();
    setTimeout(() => {
      navigation.navigate(ADD_TASK_ROUTE, { status: TODO });
    }, 100);
  };

  // Трансформации для кнопок
  const voiceButtonTransform = {
    transform: [
      {
        translateX: voiceButtonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
      {
        scale: voiceButtonAnimation.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [0.3, 0.8, 1],
        }),
      },
    ],
    opacity: voiceButtonAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
  };

  const textButtonTransform = {
    transform: [
      {
        translateY: textButtonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
      {
        scale: textButtonAnimation.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [0.3, 0.8, 1],
        }),
      },
    ],
    opacity: textButtonAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    }),
  };

  return (
    <>
      {/* Оверлей для закрытия меню */}
      <Pressable 
        style={styles.overlay} 
        onPress={toggleMenu}
        pointerEvents={isExpanded ? 'auto' : 'none'}
      >
        <Animated.View style={[styles.overlayBackground, { opacity: overlayOpacity }]} />
      </Pressable>

      <View style={styles.container}>
        {/* Кнопка голосового ввода */}
        <Animated.View 
          style={[styles.actionButton, voiceButtonTransform]} 
          pointerEvents={isExpanded ? 'auto' : 'none'}
        >
          <VoiceTaskButton selectedList={selectedList} addTask={addTask} isInline />
        </Animated.View>

        {/* Кнопка текстового ввода */}
        <Animated.View 
          style={[styles.actionButton, textButtonTransform]}
          pointerEvents={isExpanded ? 'auto' : 'none'}
        >
          <Pressable style={styles.textButton} onPress={handleTextButton}>
            <Ionicons name="pencil" size={28} color={colors.neutral_light} />
          </Pressable>
        </Animated.View>

        {/* Главная кнопка + / × */}
        <Pressable style={styles.mainButton} onPress={toggleMenu}>
          <Ionicons name={isExpanded ? 'close' : 'add'} size={32} color={colors.neutral_light} />
        </Pressable>
      </View>
    </>
  );
};

export default FloatingActionButtons;
