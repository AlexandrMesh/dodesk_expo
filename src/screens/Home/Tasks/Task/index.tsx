import React, { memo, useEffect, useRef, useState } from 'react';

import { Animated, BackHandler, Pressable, Text, TouchableHighlight, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { ADD_TASK_ROUTE, FULL_TASK_ROUTE } from '~constants/routes';
import { COMPLETED, TODO } from '~constants/statuses';
import colors from '~styles/colors';
import i18n from '~translations/i18n';
import { ITask } from '~types/tasks';

import VoiceTaskButton from '../../VoiceTaskButton';
import styles from './styles';

type SubtaskItemProps = {
  subtask: ITask;
  isSubtaskCompleted: boolean;
  onPress: () => void;
  onCheckPress: () => void;
};

const SubtaskItem = memo(({ subtask, isSubtaskCompleted, onPress, onCheckPress }: SubtaskItemProps) => {
  const subtaskBorderAnimation = useRef(new Animated.Value(0)).current;
  const subtaskGlowAnimation = useRef(new Animated.Value(0)).current;
  const [isNewSubtask, setIsNewSubtask] = useState(false);

  useEffect(() => {
    const taskAge = Date.now() - subtask.created_at;
    if (taskAge < 2000 && !isSubtaskCompleted) {
      setIsNewSubtask(true);

      Animated.loop(
        Animated.sequence([
          Animated.timing(subtaskBorderAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(subtaskBorderAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]),
        { iterations: 3 },
      ).start(() => {
        setIsNewSubtask(false);
      });

      Animated.loop(
        Animated.sequence([
          Animated.timing(subtaskGlowAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(subtaskGlowAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]),
        { iterations: 3 },
      ).start();
    }
  }, []);

  const animatedSubtaskBorderColor = subtaskBorderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [isSubtaskCompleted ? colors.success : colors.planned, colors.success],
  });

  const animatedSubtaskBackgroundColor = subtaskGlowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(27, 181, 114, 0)', 'rgba(27, 181, 114, 0.1)'],
  });

  return (
    <Animated.View
      style={[
        styles.subtask,
        isSubtaskCompleted && styles.subtaskCompleted,
        isNewSubtask && {
          borderLeftColor: animatedSubtaskBorderColor,
          backgroundColor: animatedSubtaskBackgroundColor,
        },
      ]}
    >
      <TouchableHighlight style={styles.subtaskTitleWrapper} onPress={onPress}>
        <View>
          <Text style={[styles.subtaskTitle, isSubtaskCompleted && styles.completedTitle]} numberOfLines={1}>
            {subtask.title}
          </Text>
          <View style={styles.subtaskFooter}>
            <Ionicons name='time-outline' size={10} color={colors.neutral_medium} />
            <Text style={styles.subtaskCreatedAt}>{new Date(subtask.created_at).toLocaleTimeString(i18n.language)}</Text>
          </View>
        </View>
      </TouchableHighlight>
      <Pressable style={styles.subtaskCheckBox} onPress={onCheckPress}>
        <Ionicons
          name={isSubtaskCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          size={28}
          color={isSubtaskCompleted ? colors.success : colors.neutral_medium}
        />
      </Pressable>
    </Animated.View>
  );
});

type TaskProps = {
  id: string;
  completed: boolean;
  title: string;
  updated_at: number;
  onPress: () => unknown;
  subtasks?: ITask[];
  onSubtaskPress?: (taskId: string, status: string) => unknown;
  onParentComplete?: () => unknown;
  addTask?: (task: ITask) => unknown;
  selectedList?: any;
  openSubtaskMenuId?: string | null;
  onSubtaskMenuToggle?: (taskId: string | null) => void;
};

const Task = ({
  id,
  completed,
  title,
  updated_at,
  onPress,
  subtasks = [],
  onSubtaskPress,
  onParentComplete,
  addTask,
  selectedList,
  openSubtaskMenuId,
  onSubtaskMenuToggle,
}: TaskProps) => {
  const navigation = useNavigation<any>();
  const [expanded, setExpanded] = useState(true);
  const isSubtaskMenuOpen = openSubtaskMenuId === id;
  const hasSubtasks = subtasks.length > 0;
  const completedSubtasksCount = subtasks.filter((t) => t.status === COMPLETED).length;
  const allSubtasksCompleted = hasSubtasks && completedSubtasksCount === subtasks.length;

  // Анимация для новых задач
  const borderAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const [isNewTask, setIsNewTask] = useState(false);

  // Анимация для меню подзадач
  const subtaskMenuAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Проверяем, является ли задача новой (создана менее 2 секунд назад)
    const taskAge = Date.now() - updated_at;
    if (taskAge < 2000 && !completed) {
      setIsNewTask(true);

      // Анимация мигающего зеленого бордера
      Animated.loop(
        Animated.sequence([
          Animated.timing(borderAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(borderAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]),
        { iterations: 3 }, // 3 мигания = 1.8 секунды
      ).start(() => {
        setIsNewTask(false);
      });

      // Анимация свечения
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]),
        { iterations: 3 },
      ).start();
    }
  }, []);

  const handleSubtaskPress = (taskId: string, newStatus: string) => {
    onSubtaskPress?.(taskId, newStatus);

    // Check if all subtasks will be completed after this change
    const willBeCompleted = newStatus === COMPLETED;
    const otherCompletedCount = subtasks.filter((t) => t.id !== taskId && t.status === COMPLETED).length;
    const newCompletedCount = willBeCompleted ? otherCompletedCount + 1 : otherCompletedCount;

    if (newCompletedCount === subtasks.length && !completed) {
      setTimeout(() => onParentComplete?.(), 100);
    }
  };

  const toggleSubtaskMenu = () => {
    const willOpen = !isSubtaskMenuOpen;
    const toValue = willOpen ? 1 : 0;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.timing(subtaskMenuAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onSubtaskMenuToggle?.(willOpen ? id : null);
  };

  const closeSubtaskMenu = () => {
    Animated.timing(subtaskMenuAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onSubtaskMenuToggle?.(null);
  };

  // Синхронизация анимации с внешним состоянием
  useEffect(() => {
    Animated.timing(subtaskMenuAnimation, {
      toValue: isSubtaskMenuOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSubtaskMenuOpen]);

  const handleAddSubtask = () => {
    toggleSubtaskMenu();
  };

  const handleTextSubtask = () => {
    closeSubtaskMenu();
    setTimeout(() => {
      navigation.navigate(ADD_TASK_ROUTE, { status: TODO, parentId: id });
    }, 100);
  };

  // Wrapper для добавления подзадачи с parentId
  const addSubtaskWithParent = (task: ITask) => {
    // VoiceTaskButton создает задачу, но мы должны добавить parentId
    const subtaskWithParent = {
      ...task,
      parentId: id,
    };
    addTask?.(subtaskWithParent);

    // Открываем список подзадач если он был закрыт
    if (!expanded) {
      setExpanded(true);
    }
  };

  // Обработка системной кнопки "назад" для закрытия меню
  useEffect(() => {
    if (!isSubtaskMenuOpen) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isSubtaskMenuOpen) {
        closeSubtaskMenu();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isSubtaskMenuOpen]);

  const animatedBorderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [completed ? colors.success : colors.in_progress, colors.success],
  });

  const animatedBackgroundColor = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(27, 181, 114, 0)', 'rgba(27, 181, 114, 0.15)'],
  });

  return (
    <Animated.View
      style={[
        styles.task,
        completed && styles.taskCompleted,
        isNewTask && {
          borderLeftColor: animatedBorderColor,
          backgroundColor: animatedBackgroundColor,
        },
      ]}
    >
      <View style={styles.taskTitleWrapper}>
        <View style={styles.leftButtons}>
          <View style={styles.subtaskMenuContainer}>
            {/* Кнопка голосового ввода подзадачи */}
            <Animated.View
              style={[
                styles.subtaskMenuButton,
                {
                  opacity: subtaskMenuAnimation,
                  transform: [
                    {
                      translateX: subtaskMenuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 34],
                      }),
                    },
                    {
                      translateY: subtaskMenuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 25],
                      }),
                    },
                    {
                      scale: subtaskMenuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                  ],
                },
              ]}
              pointerEvents={isSubtaskMenuOpen ? 'auto' : 'none'}
            >
              <VoiceTaskButton selectedList={selectedList} addTask={addSubtaskWithParent} isInline isSmall onTaskAdded={closeSubtaskMenu} />
            </Animated.View>

            {/* Кнопка текстового ввода подзадачи */}
            <Animated.View
              style={[
                styles.subtaskMenuButton,
                {
                  opacity: subtaskMenuAnimation,
                  transform: [
                    {
                      translateX: subtaskMenuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 88],
                      }),
                    },
                    {
                      translateY: subtaskMenuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 25],
                      }),
                    },
                    {
                      scale: subtaskMenuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1],
                      }),
                    },
                  ],
                },
              ]}
              pointerEvents={isSubtaskMenuOpen ? 'auto' : 'none'}
            >
              <Pressable style={styles.textSubtaskButton} onPress={handleTextSubtask}>
                <Ionicons name='pencil' size={20} color={colors.neutral_light} />
              </Pressable>
            </Animated.View>

            {/* Главная кнопка + / × */}
            <Pressable style={styles.addSubtaskButton} onPress={handleAddSubtask}>
              <Ionicons name={isSubtaskMenuOpen ? 'close' : 'add'} size={16} color={colors.neutral_medium} />
            </Pressable>
          </View>
          {hasSubtasks && (
            <Pressable style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
              <Ionicons name={expanded ? 'chevron-down' : 'chevron-forward'} size={14} color={colors.neutral_medium} />
            </Pressable>
          )}
        </View>
        <TouchableHighlight style={styles.titleWrapper} onPress={() => navigation.navigate(FULL_TASK_ROUTE, { taskId: id })}>
          <View>
            <Text style={[styles.taskTitle, completed && styles.completedTitle]} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <Ionicons name='time-outline' size={12} color={colors.neutral_medium} />
                <Text style={styles.taskCreatedAt}>{new Date(updated_at).toLocaleTimeString(i18n.language)}</Text>
              </View>
              {hasSubtasks && (
                <View style={styles.subtaskBadge}>
                  <Ionicons name='git-branch-outline' size={12} color={colors.neutral_white} />
                  <Text style={styles.subtaskCount}>
                    {completedSubtasksCount}/{subtasks.length}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableHighlight>
        <View>
          <Pressable style={styles.checkBoxWrapper} onPress={onPress}>
            <Ionicons
              name={completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={32}
              color={completed ? colors.success : colors.neutral_medium}
            />
          </Pressable>
        </View>
      </View>

      {hasSubtasks && expanded && (
        <View style={styles.subtasksContainer}>
          {[...subtasks]
            .sort((a, b) => b.created_at - a.created_at)
            .map((subtask) => {
              const isSubtaskCompleted = subtask.status === COMPLETED;
              return (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  isSubtaskCompleted={isSubtaskCompleted}
                  onPress={() => navigation.navigate(FULL_TASK_ROUTE, { taskId: subtask.id })}
                  onCheckPress={() => handleSubtaskPress(subtask.id, isSubtaskCompleted ? TODO : COMPLETED)}
                />
              );
            })}
        </View>
      )}
    </Animated.View>
  );
};

export default memo(Task);
