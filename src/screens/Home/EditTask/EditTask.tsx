import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { COMPLETED, TODO } from '~constants/statuses';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '~constants/tasks';
import colors from '~styles/colors';
import { IList } from '~types/lists';
import { ITask } from '~types/tasks';
import RadioButton from '~UI/RadioButton';
import Input from '~UI/TextInput';
import { getValidationFailure, validationTypes } from '~utils/validation';
import styles from '../AddTask/styles';

type EditTaskProps = {
  task: ITask;
  updateTask: (params: { id: string; title: string; status: string; description: string }) => unknown;
  selectedList: IList;
};

type StatusItemProps = {
  status: string;
  isSelected: boolean;
  onPress: () => unknown;
};

const StatusItem = ({ status, isSelected, onPress }: StatusItemProps) => {
  const { t } = useTranslation(['tasks']);

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.statusWrapper, isSelected && styles.statusWrapperSelected]}>
        <RadioButton isSelected={isSelected} style={styles.radioButton} />
        <Text numberOfLines={1} style={styles.statusLabel}>
          {t(`tasks:${status}`)}
        </Text>
        {status === COMPLETED && <Ionicons name="checkmark-circle" size={18} color={isSelected ? colors.success : colors.neutral_medium} style={{ marginLeft: 'auto' }} />}
        {status === TODO && <Ionicons name="time-outline" size={18} color={isSelected ? colors.in_progress : colors.neutral_medium} style={{ marginLeft: 'auto' }} />}
      </View>
    </Pressable>
  );
};

const EditTask = ({ task, updateTask, selectedList }: EditTaskProps) => {
  const { t } = useTranslation(['tasks', 'common', 'errors']);

  const [title, setTitle] = useState<string>(task.title);
  const [titleError, setTitleError] = useState<string>('');
  const [description, setDescription] = useState<string>(task.description || '');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [status, setStatus] = useState(task.status);
  const navigation = useNavigation<any>();

  const validateTitle = () => {
    const params = {
      minLength: 2,
      maxLength: TITLE_MAX_LENGTH
    };
    const error = getValidationFailure(title.trim(), [validationTypes.isTooShort, validationTypes.isTooLong], params);
    setTitleError(error ? t(`errors:${error}`, params) : '');
    return !error;
  };

  const validateDescription = () => {
    const params = {
      maxLength: DESCRIPTION_MAX_LENGTH
    };
    const error = getValidationFailure(description.trim(), [validationTypes.isTooLong], params);
    setDescriptionError(error ? t(`errors:${error}`, params) : '');
    return !error;
  };

  const handleUpdateTask = () => {
    const isValid = validateTitle() && validateDescription();
    if (isValid) {
      updateTask({
        id: task.id,
        title: title.trim(),
        status,
        description: description.trim()
      });
      navigation.goBack();
    }
  };

  const handleChangeTitle = (value: string) => {
    setTitleError('');
    setTitle(value);
  };

  const handleChangeDescription = (value: string) => {
    setDescriptionError('');
    setDescription(value);
  };

  const handleClearTitle = () => {
    setTitleError('');
    setTitle('');
  };

  const handleClearDescription = () => {
    setDescriptionError('');
    setDescription('');
  };

  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Ionicons name="create-outline" size={24} color={colors.planned} />
            <Text style={styles.title}>{t('tasks:editTask')}</Text>
          </View>
          <Text numberOfLines={1} style={styles.subTitle}>
            {t('common:in')} {selectedList?.title}
          </Text>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name="text-outline" size={18} color={colors.neutral_medium} />
              <Text style={styles.inputLabel}>
                {t('tasks:taskTitle')} {t('common:required')}
              </Text>
              <Text style={styles.inputCounter}>{`${title.trim().length}/${TITLE_MAX_LENGTH}`}</Text>
            </View>

            <Input
              placeholder={t('enterTaskTitle')}
              onChangeText={handleChangeTitle}
              value={title}
              shouldDisplayClearButton={title.length > 0}
              error={titleError}
              onClear={handleClearTitle}
            />
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name="document-text-outline" size={18} color={colors.neutral_medium} />
              <Text style={styles.inputLabel}>{t('taskDescription')}</Text>
              <Text style={styles.inputCounter}>{`${description.trim().length}/${DESCRIPTION_MAX_LENGTH}`}</Text>
            </View>

            <Input
              placeholder={t('enterTaskDescription')}
              onChangeText={handleChangeDescription}
              wrapperClassName={styles.descriptionWrapperClassName}
              className={styles.descriptionInput}
              value={description}
              shouldDisplayClearButton={description.length > 0}
              onClear={handleClearDescription}
              error={descriptionError}
              multiline
              numberOfLines={5}
            />
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name="flag-outline" size={18} color={colors.neutral_medium} />
              <Text style={styles.inputLabel}>{t('taskStatus')}</Text>
            </View>

            <View style={styles.statuses}>
              <StatusItem status={TODO} isSelected={status === TODO} onPress={() => setStatus(TODO)} />
              <StatusItem status={COMPLETED} isSelected={status === COMPLETED} onPress={() => setStatus(COMPLETED)} />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerButtonsWrapper}>
          <Pressable style={styles.actionButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.neutral_light} />
          </Pressable>
          <Pressable style={[styles.actionButton, styles.saveButton]} onPress={handleUpdateTask}>
            <Ionicons name="checkmark" size={24} color={colors.neutral_white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditTask;
