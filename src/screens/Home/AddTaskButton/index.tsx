import React from 'react';
import { TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '~styles/colors';
import PlusIcon from '~assets/plus.svg';
import styles from './styles';

type AddTaskProps = {
  route: string;
  status: string;
};

const AddTaskButton = ({ route, status }: AddTaskProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableHighlight style={styles.addTaskButton} onPress={() => navigation.navigate(route, { status })}>
      <PlusIcon width={28} height={28} fill={colors.neutral_light} />
    </TouchableHighlight>
  );
};

export default AddTaskButton;
