import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import colors from '~styles/colors';
import Size from '../constants/sizes';
import styles from '../styles';

type SpinnerProps = {
  color?: string;
  label?: string;
  size?: typeof Size.SMALL | typeof Size.LARGE;
  backgroundColor?: string;
  labelColor?: string;
};

const Spinner = ({
  backgroundColor = colors.primary_dark,
  color = colors.neutral_light,
  labelColor = colors.neutral_light,
  size = Size.LARGE,
  label
}: SpinnerProps) => {
  return (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor
        }
      ]}
    >
      <ActivityIndicator color={color} size={size} />
      {label && <Text style={[{ color: labelColor }, styles.label]}>{label}</Text>}
    </View>
  );
};

export default Spinner;
