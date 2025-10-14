import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { RADIO_BUTTON_ICON } from '~constants/dimensions';
import RadioButtonOn from '~assets/radio-button-on.svg';
import RadioButtonOff from '~assets/radio-button-off.svg';
import colors from '~styles/colors';

type RadioButtonProps = {
  isSelected: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

const RadioButton = ({ isSelected, color, style }: RadioButtonProps) =>
  isSelected ? (
    <RadioButtonOn style={style} width={RADIO_BUTTON_ICON.width} height={RADIO_BUTTON_ICON.height} fill={color || colors.neutral_light} />
  ) : (
    <RadioButtonOff style={style} width={RADIO_BUTTON_ICON.width} height={RADIO_BUTTON_ICON.height} fill={color || colors.neutral_light} />
  );

export default RadioButton;
