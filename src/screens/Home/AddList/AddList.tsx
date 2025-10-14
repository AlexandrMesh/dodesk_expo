import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import i18n from '~translations/i18n';
import Input from '~UI/TextInput';
import Button from '~UI/Button';
import { getValidationFailure, validationTypes } from '~utils/validation';
import { IList } from '~types/lists';
import { SECONDARY } from '~constants/themes';
import { TITLE_MAX_LENGTH } from '~constants/lists';
import styles from './styles';

type AddListProps = {
  addList: (params: IList) => unknown;
  selectListId: (id: string) => unknown;
  listData: IList[];
};

const AddList = ({ addList, selectListId, listData }: AddListProps) => {
  const { t } = useTranslation(['lists', 'common', 'errors']);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const navigation = useNavigation<any>();

  const validateTitle = () => {
    const params = {
      minLength: 2,
      maxLength: TITLE_MAX_LENGTH
    };
    const listExists = listData.some((item) => item.title.toLocaleLowerCase() === title.trim().toLocaleLowerCase()) ? 'listExists' : null;
    const error = getValidationFailure(title.trim(), [validationTypes.isTooShort, validationTypes.isTooLong], params) || listExists;
    setTitleError(error ? t(`errors:${error}`, params) : '');
    return !error;
  };

  const handleAddList = () => {
    const isValid = validateTitle();
    if (isValid) {
      const currentDate = new Date();
      const created_at = currentDate.getTime();
      const listId = uuidv4();
      addList({
        id: listId,
        title: title.trim(),
        created_at,
        language: i18n.language
      });
      selectListId(listId);
      navigation.goBack();
    }
  };

  const handleChangeTitle = (value: string) => {
    setTitleError('');
    setTitle(value);
  };

  const handleClearTitle = () => {
    setTitleError('');
    setTitle('');
  };

  return (
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('lists:newList')}</Text>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.block}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>
                {t('lists:listTitle')} {t('common:required')}
              </Text>
              <Text style={styles.inputLabel}>{`${title.trim().length}/${TITLE_MAX_LENGTH}`}</Text>
            </View>

            <Input
              placeholder={t('enterListTitle')}
              onChangeText={handleChangeTitle}
              value={title}
              shouldDisplayClearButton={title.length > 0}
              error={titleError}
              onClear={handleClearTitle}
            />
          </View>
        </ScrollView>
        <View style={styles.footerButtonsWrapper}>
          <Button theme={SECONDARY} style={styles.footerButton} onPress={() => navigation.goBack()} title={t('common:back')} />
          <Button style={styles.footerButton} onPress={handleAddList} title={t('common:add')} />
        </View>
      </View>
    </View>
  );
};

export default AddList;
