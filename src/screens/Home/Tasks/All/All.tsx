import React, { memo, useCallback } from 'react';
import { View, Text, SectionList } from 'react-native';
import { ITask } from '~types/tasks';
import AddTaskButton from '~screens/Home/AddTaskButton';
import { ADD_TASK_ROUTE } from '~constants/routes';
import { COMPLETED, TODO } from '~constants/statuses';
import Task from '../Task';
import EmptyList from '../EmptyList';
import styles from './styles';

type AllProps = {
  tasks: ITask[];
  sectionedTasks: { completed: boolean; completedCount: number; count: number; title: string; data: ITask[] }[];
  updateTaskStatus: ({ taskId, status, completed_at }: { taskId: string; status: string; completed_at: number }) => unknown;
};

const All = ({ tasks, updateTaskStatus, sectionedTasks }: AllProps) => {
  const currentDate = new Date();
  const completed_at = currentDate.getTime();

  const getKeyExtractor = useCallback((item: ITask) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: ITask }) => (
      <Task
        completed={item.status === COMPLETED}
        id={item.id}
        title={item.title}
        updated_at={item.created_at}
        onPress={() => updateTaskStatus({ taskId: item.id, status: item.status === COMPLETED ? TODO : COMPLETED, completed_at })}
      />
    ),
    [completed_at, updateTaskStatus]
  );

  const renderSectionHeader = useCallback(
    ({ section }: any) => (
      <View style={styles.stickyHeader}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>{section.title}</Text>
        </View>
        <View style={[styles.taskCount, styles.headerTitle, section.completed && styles.completed]}>
          <Text style={[styles.headerTitleText, section.completed && styles.completedText]}>{section.completedCount}</Text>
          <Text style={[styles.headerTitleText, section.completed && styles.completedText]}>/</Text>
          <Text style={[styles.headerTitleText, section.completed && styles.completedText]}>{section.count}</Text>
        </View>
      </View>
    ),
    []
  );

  return (
    <View style={styles.wrapper}>
      {tasks.length > 0 ? (
        <SectionList
          initialNumToRender={30}
          keyExtractor={getKeyExtractor}
          sections={sectionedTasks}
          stickySectionHeadersEnabled
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <EmptyList />
      )}
      <AddTaskButton route={ADD_TASK_ROUTE} status={TODO} />
    </View>
  );
};

export default memo(All);
