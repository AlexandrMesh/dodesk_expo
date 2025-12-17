import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import Button from '~UI/Button';
import { ADD_TASK_ROUTE, EDIT_TASK_ROUTE } from '~constants/routes';
import { TODO } from '~constants/statuses';
import { SECONDARY } from '~constants/themes';
import i18n from '~translations/i18n';
import { ITask } from '~types/tasks';
import showRelativeDate from '~utils/relativeDate';
import styles from './styles';

type FullTaskProps = {
  task: ITask;
  removeTask: (id: string) => unknown;
};

const FullTask = ({ task, removeTask }: FullTaskProps) => {
  const { t } = useTranslation(['tasks', 'common']);
  const navigation = useNavigation<any>();

  const { id, title, description, status, created_at, completed_at } = task;

  const displayDate = (date: number) => `${showRelativeDate(date)} ${t('common:in')} ${new Date(date).toLocaleTimeString(i18n.language)}`;

  const onTaskRemove = () => {
    removeTask(id);
    navigation.goBack();
  };

  const onTaskEdit = () => {
    navigation.navigate(EDIT_TASK_ROUTE, { taskId: id });
  };

  const onAddSubtask = () => {
    navigation.navigate(ADD_TASK_ROUTE, { status: TODO, parentId: id });
  };

  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text selectable style={styles.title}>{title}</Text>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View>
            <View style={styles.block}>
              <Text style={[styles.label, styles.bold]}>{`${t('tasks:taskStatus')}: `}</Text>
              <Text selectable style={styles.label}>{t(`tasks:${status}`)}</Text>
            </View>
          </View>

          <View>
            <View style={styles.block}>
              <Text style={[styles.label, styles.bold]}>{`${t('tasks:createdAt')}: `}</Text>
              <Text selectable style={styles.label}>{displayDate(created_at)}</Text>
            </View>
          </View>

          {!!completed_at && (
            <View>
              <View style={styles.block}>
                <Text style={[styles.label, styles.bold]}>{`${t('tasks:completedAt')}: `}</Text>
                <Text selectable style={styles.label}>{displayDate(completed_at)}</Text>
              </View>
            </View>
          )}

          {!!description && (
            <View>
              <View style={styles.block}>
                <View>
                  <Text style={[styles.label, styles.bold]}>{`${t('tasks:taskDescription')}: `}</Text>
                  <Text selectable style={styles.label}>{description}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.footerButtonsWrapper}>
          <Button theme={SECONDARY} style={styles.footerButton} onPress={() => navigation.goBack()} title={t('common:back')} />
          <Button theme={SECONDARY} style={styles.footerButton} onPress={onAddSubtask} title={t('tasks:addSubtask')} />
          <Button theme={SECONDARY} style={styles.footerButton} onPress={onTaskEdit} title={t('common:edit')} />
          <Button theme={SECONDARY} style={styles.footerButton} onPress={onTaskRemove} title={t('common:remove')} />
        </View>
      </View>
    </View>
  );
};

export default FullTask;
