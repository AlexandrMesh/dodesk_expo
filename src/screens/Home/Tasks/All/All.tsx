import React, { memo, useCallback, useRef } from 'react';

import { SectionList, Text, View } from 'react-native';

import { COMPLETED, TODO } from '~constants/statuses';
import FloatingActionButtons from '~screens/Home/FloatingActionButtons';
import { IList } from '~types/lists';
import { ITask } from '~types/tasks';

import EmptyList from '../EmptyList';
import Task from '../Task';
import styles from './styles';

type AllProps = {
  tasks: ITask[];
  sectionedTasks: { completed: boolean; completedCount: number; count: number; title: string; data: ITask[] }[];
  updateTaskStatus: ({ taskId, status, completed_at }: { taskId: string; status: string; completed_at: number }) => unknown;
  subtasksMap: Record<string, ITask[]>;
  selectedList: IList;
  addTask: (task: ITask) => unknown;
};

const All = ({ tasks, updateTaskStatus, sectionedTasks, subtasksMap, selectedList, addTask }: AllProps) => {
  const currentDate = new Date();
  const completed_at = currentDate.getTime();
  const sectionListRef = useRef<SectionList>(null);

  const scrollToTop = useCallback(() => {
    if (sectionListRef.current && sectionedTasks.length > 0) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: true,
      });
    }
  }, [sectionedTasks]);

  const getKeyExtractor = useCallback((item: ITask) => item.id, []);

  const handleSubtaskPress = useCallback((taskId: string, status: string) => {
    updateTaskStatus({ taskId, status, completed_at: new Date().getTime() });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ITask }) => (
      <Task
        completed={item.status === COMPLETED}
        id={item.id}
        title={item.title}
        updated_at={item.created_at}
        onPress={() => updateTaskStatus({ taskId: item.id, status: item.status === COMPLETED ? TODO : COMPLETED, completed_at })}
        subtasks={subtasksMap[item.id] || []}
        onSubtaskPress={handleSubtaskPress}
        onParentComplete={() => updateTaskStatus({ taskId: item.id, status: COMPLETED, completed_at: new Date().getTime() })}
        addTask={addTask}
        selectedList={selectedList}
      />
    ),
    [completed_at, updateTaskStatus, subtasksMap, handleSubtaskPress, addTask, selectedList],
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
    [],
  );

  return (
    <View style={styles.wrapper}>
      {tasks.length > 0 ? (
        <SectionList
          ref={sectionListRef}
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
      <FloatingActionButtons selectedList={selectedList} addTask={addTask} onTaskAdded={scrollToTop} />
    </View>
  );
};

export default memo(All);
