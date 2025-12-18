import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { ADD_TASK_ROUTE, FULL_TASK_ROUTE } from '~constants/routes';
import { COMPLETED, TODO } from '~constants/statuses';
import colors from '~styles/colors';
import i18n from '~translations/i18n';
import { ITask } from '~types/tasks';
import CheckBox from '~UI/CheckBox';
import styles from './styles';

type TaskProps = {
  id: string;
  completed: boolean;
  title: string;
  updated_at: number;
  onPress: () => unknown;
  subtasks?: ITask[];
  onSubtaskPress?: (taskId: string, status: string) => unknown;
  onParentComplete?: () => unknown;
};

const Task = ({ id, completed, title, updated_at, onPress, subtasks = [], onSubtaskPress, onParentComplete }: TaskProps) => {
  const navigation = useNavigation<any>();
  const [expanded, setExpanded] = useState(true);
  const hasSubtasks = subtasks.length > 0;
  const completedSubtasksCount = subtasks.filter(t => t.status === COMPLETED).length;
  const allSubtasksCompleted = hasSubtasks && completedSubtasksCount === subtasks.length;
  
  // Анимация для новых задач
  const borderAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const [isNewTask, setIsNewTask] = useState(false);

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
        { iterations: 3 } // 3 мигания = 1.8 секунды
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
        { iterations: 3 }
      ).start();
    }
  }, []);

  const handleSubtaskPress = (taskId: string, newStatus: string) => {
    onSubtaskPress?.(taskId, newStatus);
    
    // Check if all subtasks will be completed after this change
    const willBeCompleted = newStatus === COMPLETED;
    const otherCompletedCount = subtasks.filter(t => t.id !== taskId && t.status === COMPLETED).length;
    const newCompletedCount = willBeCompleted ? otherCompletedCount + 1 : otherCompletedCount;
    
    if (newCompletedCount === subtasks.length && !completed) {
      setTimeout(() => onParentComplete?.(), 100);
    }
  };

  const handleAddSubtask = () => {
    navigation.navigate(ADD_TASK_ROUTE, { status: TODO, parentId: id });
  };

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
        }
      ]}
    >
      <View style={styles.taskTitleWrapper}>
        <View style={styles.leftButtons}>
          <Pressable style={styles.addSubtaskButton} onPress={handleAddSubtask}>
            <Ionicons name="add" size={16} color={colors.neutral_medium} />
          </Pressable>
          {hasSubtasks && (
            <Pressable style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
              <Ionicons name={expanded ? 'chevron-down' : 'chevron-forward'} size={14} color={colors.neutral_medium} />
            </Pressable>
          )}
        </View>
        <TouchableHighlight style={styles.titleWrapper} onPress={() => navigation.navigate(FULL_TASK_ROUTE, { taskId: id })}>
          <View>
            <Text style={[styles.taskTitle, completed && styles.completedTitle]} numberOfLines={2}>{title}</Text>
            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <Ionicons name="time-outline" size={12} color={colors.neutral_medium} />
                <Text style={styles.taskCreatedAt}>{new Date(updated_at).toLocaleTimeString(i18n.language)}</Text>
              </View>
              {hasSubtasks && (
                <View style={styles.subtaskBadge}>
                  <Ionicons name="git-branch-outline" size={12} color={colors.neutral_white} />
                  <Text style={styles.subtaskCount}>{completedSubtasksCount}/{subtasks.length}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableHighlight>
        <View>
          <Pressable style={styles.checkBoxWrapper} onPress={onPress}>
            <CheckBox color={completed ? colors.neutral_medium : ''} isChecked={completed} />
          </Pressable>
        </View>
      </View>
      
      {hasSubtasks && expanded && (
        <View style={styles.subtasksContainer}>
          {subtasks.map((subtask) => {
            const isSubtaskCompleted = subtask.status === COMPLETED;
            return (
              <View key={subtask.id} style={[styles.subtask, isSubtaskCompleted && styles.subtaskCompleted]}>
                <TouchableHighlight 
                  style={styles.subtaskTitleWrapper} 
                  onPress={() => navigation.navigate(FULL_TASK_ROUTE, { taskId: subtask.id })}
                >
                  <View>
                    <Text style={[styles.subtaskTitle, isSubtaskCompleted && styles.completedTitle]} numberOfLines={1}>
                      {subtask.title}
                    </Text>
                    <View style={styles.subtaskFooter}>
                      <Ionicons name="time-outline" size={10} color={colors.neutral_medium} />
                      <Text style={styles.subtaskCreatedAt}>
                        {new Date(subtask.created_at).toLocaleTimeString(i18n.language)}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <Pressable 
                  style={styles.subtaskCheckBox} 
                  onPress={() => handleSubtaskPress(subtask.id, isSubtaskCompleted ? TODO : COMPLETED)}
                >
                  <CheckBox 
                    color={isSubtaskCompleted ? colors.neutral_medium : ''} 
                    isChecked={isSubtaskCompleted} 
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </Animated.View>
  );
};

export default memo(Task);
