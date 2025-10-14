import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const EmptyList = () => {
  const { t } = useTranslation('lists');

  return (
    <View style={styles.emptyListWrapper}>
      <Text style={styles.emptyListText}>{t('emptyListDescription')}</Text>
    </View>
  );
};

export default EmptyList;
