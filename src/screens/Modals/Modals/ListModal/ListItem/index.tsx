import React from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import RadioButton from '~UI/RadioButton';
import colors from '~styles/colors';
import { DEFAULT_TITLE_ID } from '~constants/lists';
import RemoveIcon from '~assets/remove.svg';
import styles from './styles';

type ItemProps = {
  id: string;
  title: string;
  isSelected: boolean;
  action: () => unknown;
  onRemoveList: () => unknown;
};

const Item = ({ id, title, isSelected, action, onRemoveList }: ItemProps) => {
  const { t } = useTranslation(['lists', 'common']);

  const createRemoveListAlert = () =>
    Alert.alert(t('removeListTitle'), t('removeListDescription'), [
      {
        text: t('common:cancel')
      },
      { text: t('common:remove'), onPress: onRemoveList }
    ]);

  return (
    <Pressable style={styles.menuItem} onPress={action}>
      <View style={styles.labelWrapper}>
        <Text numberOfLines={1} style={styles.menuItemTitle}>
          {title}
        </Text>
        {id !== DEFAULT_TITLE_ID && (
          <Pressable style={styles.removeIcon} onPress={createRemoveListAlert}>
            <RemoveIcon fill={colors.neutral_medium} width={20} height={20} />
          </Pressable>
        )}
      </View>
      <RadioButton isSelected={isSelected} />
    </Pressable>
  );
};

export default Item;
