import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TITLE_MAX_LENGTH } from '~constants/lists';
import colors from '~styles/colors';
import i18n from '~translations/i18n';
import { IList } from '~types/lists';
import Input from '~UI/TextInput';
import { getValidationFailure, validationTypes } from '~utils/validation';
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
          <View style={styles.headerLeft}>
            <View style={styles.typeTag}>
              <Ionicons name='folder-outline' size={14} color={colors.neutral_white} />
              <Text style={styles.typeTagText}>{t('lists:newList')}</Text>
            </View>
            <Text style={styles.title}>{t('lists:listTitle')}</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollWrapper} keyboardShouldPersistTaps='handled'>
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Ionicons name='create-outline' size={18} color={colors.neutral_medium} />
              <Text style={styles.inputLabel}>{t('lists:listTitle')}</Text>
              <Text style={styles.required}>{t('common:required')}</Text>
            </View>
            
            <View style={styles.characterCount}>
              <Ionicons name='text-outline' size={14} color={colors.neutral_medium} />
              <Text style={styles.characterCountText}>{`${title.trim().length}/${TITLE_MAX_LENGTH}`}</Text>
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

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name='information-circle-outline' size={20} color={colors.in_progress} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{t('lists:listInfo')}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerButtonsWrapper}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back' size={20} color={colors.neutral_light} />
          </Pressable>
          <Pressable style={styles.addButton} onPress={handleAddList}>
            <Ionicons name='checkmark' size={20} color={colors.neutral_white} />
            <Text style={styles.addButtonText}>{t('common:add')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddList;
