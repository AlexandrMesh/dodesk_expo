import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from '~UI/Button';
import SlideMenu from '~UI/SlideMenu';
import { IList } from '~types/lists';
import { ADD_LIST_ROUTE } from '~constants/routes';
import ListItem from './ListItem';
import styles from './styles';

type ListModalProps = {
  isVisible: boolean;
  lists: IList[];
  hideModal: () => unknown;
  selectedList: IList;
  selectListId: (id: string) => unknown;
  removeList: (listId: string) => unknown;
};

const ListModal = ({ isVisible, lists, hideModal, selectedList, selectListId, removeList }: ListModalProps) => {
  const { t } = useTranslation(['tasks', 'common']);
  const navigation = useNavigation<any>();
  const [newListId, setNewListId] = useState<string>(selectedList?.id);
  const [shouldAutoClose, setShouldAutoClose] = useState<boolean>(false);

  const actionTypes = lists.map(({ id, title }) => ({ id, title, isSelected: newListId === id, action: () => setNewListId(id) }));

  useEffect(() => {
    if (shouldAutoClose) {
      setShouldAutoClose(false);
    }
  }, [shouldAutoClose]);

  // Проверить чтобы не было 2 вызовы
  useEffect(() => {
    if (isVisible) {
      setNewListId(selectedList?.id);
    }
  }, [isVisible, selectedList?.id]);

  const handleClose = () => {
    hideModal();
  };

  const handleUpdate = () => {
    selectListId(newListId);
    setShouldAutoClose(true);
  };

  const handlePressAddListButton = () => {
    setShouldAutoClose(true);
    navigation.navigate(ADD_LIST_ROUTE);
  };

  return (
    <SlideMenu
      onPressHeaderButton={handlePressAddListButton}
      headerButtonTitle={t('common:create')}
      isVisible={isVisible}
      title={t('lists:chooseList')}
      onClose={handleClose}
      shouldAutoClose={shouldAutoClose}
    >
      <FlatList
        data={actionTypes}
        renderItem={({ item }) => (
          <ListItem id={item.id} title={item.title} onRemoveList={() => removeList(item.id)} isSelected={item.isSelected} action={item.action} />
        )}
        keyExtractor={({ id }) => id}
      />
      <View style={styles.submitButtonWrapper}>
        <Button style={styles.submitButton} title={t('common:choose')} onPress={handleUpdate} />
      </View>
    </SlideMenu>
  );
};

export default ListModal;
