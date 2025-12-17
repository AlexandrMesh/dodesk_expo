import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { Pressable, Text, TouchableHighlight, View } from 'react-native';
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

  return (
    <View style={styles.task}>
      <View style={styles.taskTitleWrapper}>
        <View style={styles.leftButtons}>
          <Pressable style={styles.addSubtaskButton} onPress={handleAddSubtask}>
            <Text style={styles.addSubtaskIcon}>+</Text>
          </Pressable>
          {hasSubtasks && (
            <Pressable style={styles.expandButton} onPress={() => setExpanded(!expanded)}>
              <Text style={styles.expandIcon}>{expanded ? '▾' : '▸'}</Text>
            </Pressable>
          )}
        </View>
        <TouchableHighlight style={styles.titleWrapper} onPress={() => navigation.navigate(FULL_TASK_ROUTE, { taskId: id })}>
          <View>
            <Text style={[styles.taskTitle, completed && styles.completedTitle]}>{title}</Text>
            <View style={styles.footer}>
              <Text style={styles.taskCreatedAt}>{new Date(updated_at).toLocaleTimeString(i18n.language)}</Text>
              {hasSubtasks && (
                <Text style={styles.subtaskCount}>{completedSubtasksCount}/{subtasks.length}</Text>
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
                    <Text style={[styles.subtaskTitle, isSubtaskCompleted && styles.completedTitle]}>
                      {subtask.title}
                    </Text>
                    <Text style={styles.subtaskCreatedAt}>
                      {new Date(subtask.created_at).toLocaleTimeString(i18n.language)}
                    </Text>
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
    </View>
  );
};

export default memo(Task);
