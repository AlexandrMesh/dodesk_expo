import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { ADD_TASK_ROUTE, EDIT_TASK_ROUTE } from '~constants/routes';
import { COMPLETED, TODO } from '~constants/statuses';
import colors from '~styles/colors';
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

  const { id, title, description, status, created_at, completed_at, parentId } = task;
  const isSubtask = !!parentId;
  const isCompleted = status === COMPLETED;

  const displayDate = (date: number) => `${showRelativeDate(date)} ${t('common:in')} ${new Date(date).toLocaleTimeString(i18n.language)}`;

  const onTaskRemove = () => {
    Alert.alert(
      t('common:confirmDelete'),
      t('common:confirmDeleteMessage'),
      [
        { text: t('common:cancel'), style: 'cancel' },
        { 
          text: t('common:remove'), 
          style: 'destructive',
          onPress: () => {
            removeTask(id);
            navigation.goBack();
          }
        }
      ]
    );
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
          <View style={styles.headerLeft}>
            <View style={[styles.typeTag, isSubtask && styles.subtaskTag]}>
              <Ionicons 
                name={isSubtask ? 'git-branch-outline' : 'checkbox-outline'} 
                size={14} 
                color={colors.neutral_white} 
              />
              <Text style={styles.typeTagText}>
                {isSubtask ? t('tasks:subtask') : t('tasks:task')}
              </Text>
            </View>
            <Text selectable style={styles.title}>{title}</Text>
          </View>
          {!isSubtask && (
            <Pressable style={styles.addSubtaskButton} onPress={onAddSubtask}>
              <Ionicons name="add" size={20} color={colors.neutral_medium} />
            </Pressable>
          )}
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons 
                  name={isCompleted ? 'checkmark-circle' : 'time-outline'} 
                  size={20} 
                  color={isCompleted ? colors.success : colors.in_progress} 
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{t('tasks:taskStatus')}</Text>
                <Text style={[styles.infoValue, isCompleted && styles.completedText]}>
                  {t(`tasks:${status}`)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={20} color={colors.neutral_medium} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{t('tasks:createdAt')}</Text>
                <Text selectable style={styles.infoValue}>{displayDate(created_at)}</Text>
              </View>
            </View>

            {!!completed_at && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="checkmark-done-outline" size={20} color={colors.success} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>{t('tasks:completedAt')}</Text>
                    <Text selectable style={styles.infoValue}>{displayDate(completed_at)}</Text>
                  </View>
                </View>
              </>
            )}
          </View>

          {!!description && (
            <View style={styles.descriptionCard}>
              <View style={styles.descriptionHeader}>
                <Ionicons name="document-text-outline" size={18} color={colors.neutral_medium} />
                <Text style={styles.descriptionLabel}>{t('tasks:taskDescription')}</Text>
              </View>
              <Text selectable style={styles.descriptionText}>{description}</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.footerButtonsWrapper}>
          <Pressable style={styles.actionButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.neutral_light} />
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onTaskEdit}>
            <Ionicons name="create-outline" size={20} color={colors.neutral_light} />
          </Pressable>
          <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={onTaskRemove}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FullTask;
