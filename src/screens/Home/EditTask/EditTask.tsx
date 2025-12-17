import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { COMPLETED, TODO } from '~constants/statuses';
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from '~constants/tasks';
import { SECONDARY } from '~constants/themes';
import { IList } from '~types/lists';
import { ITask } from '~types/tasks';
import Button from '~UI/Button';
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
    <TouchableHighlight onPress={onPress}>
      <View style={styles.statusWrapper}>
        <RadioButton isSelected={isSelected} style={styles.radioButton} />
        <Text numberOfLines={1} style={styles.inputLabel}>
          {t(`tasks:${status}`)}
        </Text>
      </View>
    </TouchableHighlight>
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
          <Text style={styles.title}>{t('tasks:editTask')}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {t('common:in')} {selectedList?.title}
          </Text>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.block}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>
                {t('tasks:taskTitle')} {t('common:required')}
              </Text>
              <Text style={styles.inputLabel}>{`${title.trim().length}/${TITLE_MAX_LENGTH}`}</Text>
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

          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{t('taskDescription')}</Text>
              <Text style={styles.inputLabel}>{`${description.trim().length}/${DESCRIPTION_MAX_LENGTH}`}</Text>
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

          <View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>{t('taskStatus')}</Text>
            </View>

            <View style={styles.statuses}>
              <StatusItem status={TODO} isSelected={status === TODO} onPress={() => setStatus(TODO)} />
              <StatusItem status={COMPLETED} isSelected={status === COMPLETED} onPress={() => setStatus(COMPLETED)} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerButtonsWrapper}>
          <Button theme={SECONDARY} style={styles.footerButton} onPress={() => navigation.goBack()} title={t('common:back')} />
          <Button style={styles.footerButton} onPress={handleUpdateTask} title={t('common:save')} />
        </View>
      </View>
    </View>
  );
};

export default EditTask;
