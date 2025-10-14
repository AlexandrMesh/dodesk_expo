import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from '~UI/Button';
import { ITask } from '~types/tasks';
import i18n from '~translations/i18n';
import { SECONDARY } from '~constants/themes';
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

  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View>
            <View style={styles.block}>
              <Text style={[styles.label, styles.bold]}>{`${t('tasks:taskStatus')}: `}</Text>
              <Text style={styles.label}>{t(`tasks:${status}`)}</Text>
            </View>
          </View>

          <View>
            <View style={styles.block}>
              <Text style={[styles.label, styles.bold]}>{`${t('tasks:createdAt')}: `}</Text>
              <Text style={styles.label}>{displayDate(created_at)}</Text>
            </View>
          </View>

          {!!completed_at && (
            <View>
              <View style={styles.block}>
                <Text style={[styles.label, styles.bold]}>{`${t('tasks:completedAt')}: `}</Text>
                <Text style={styles.label}>{displayDate(completed_at)}</Text>
              </View>
            </View>
          )}

          {!!description && (
            <View>
              <View style={styles.block}>
                <View>
                  <Text style={[styles.label, styles.bold]}>{`${t('tasks:taskDescription')}: `}</Text>
                  <Text style={styles.label}>{description}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.footerButtonsWrapper}>
          <Button theme={SECONDARY} style={styles.footerButton} onPress={() => navigation.goBack()} title={t('common:back')} />
          <Button theme={SECONDARY} style={styles.footerButton} onPress={onTaskRemove} title={t('common:remove')} />
        </View>
      </View>
    </View>
  );
};

export default FullTask;
