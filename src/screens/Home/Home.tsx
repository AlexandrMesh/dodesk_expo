import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { IList } from '~types/lists';
import All from './Tasks/All';
import styles from './styles';

type HomeProps = {
  selectedList: IList;
  showListModal: () => unknown;
};

const Home = ({ selectedList, showListModal }: HomeProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <TouchableHighlight onPress={showListModal}>
            <Text numberOfLines={1} style={styles.listTitle}>
              {selectedList?.title}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <All />
    </View>
  );
};

export default Home;
