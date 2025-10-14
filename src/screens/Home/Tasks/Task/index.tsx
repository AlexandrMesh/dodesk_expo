import React, { memo } from 'react';
import { View, Text, TouchableHighlight, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FULL_TASK_ROUTE } from '~constants/routes';
import i18n from '~translations/i18n';
import CheckBox from '~UI/CheckBox';
import colors from '~styles/colors';
import styles from './styles';

type TaskProps = {
  id: string;
  completed: boolean;
  title: string;
  updated_at: number;
  onPress: () => unknown;
};

const Task = ({ id, completed, title, updated_at, onPress }: TaskProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.task}>
      <View style={styles.taskTitleWrapper}>
        <TouchableHighlight style={styles.titleWrapper} onPress={() => navigation.navigate(FULL_TASK_ROUTE, { taskId: id })}>
          <View>
            <Text style={[styles.taskTitle, completed && styles.completedTitle]}>{title}</Text>
            <View style={styles.footer}>
              <Text style={styles.taskCreatedAt}>{new Date(updated_at).toLocaleTimeString(i18n.language)}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View>
          <Pressable style={styles.checkBoxWrapper} onPress={onPress}>
            <CheckBox color={completed ? colors.neutral_medium : ''} isChecked={completed} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default memo(Task);
