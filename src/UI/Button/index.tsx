import React, { ReactNode } from 'react';
import { TouchableHighlight, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { PRIMARY, SECONDARY } from '~constants/themes';
import styles from './styles';

type ButtonProps = {
  icon?: ReactNode;
  title: string;
  titleStyle?: StyleProp<ViewStyle | TextStyle>;
  onPress: () => unknown;
  style?: StyleProp<ViewStyle | TextStyle>;
  iconClassName?: StyleProp<ViewStyle | TextStyle>;
  disabled?: boolean;
  theme?: typeof PRIMARY | typeof SECONDARY;
  iconPosition?: 'left' | 'right';
};

const Button = ({ icon, iconPosition = 'left', title, titleStyle, onPress, theme = PRIMARY, style, iconClassName, disabled }: ButtonProps) => {
  const getTheme = () => ({
    [PRIMARY]: styles.primary,
    [SECONDARY]: styles.secondary
  });

  const handlePress = () => {
    if (!disabled) {
      onPress();
    } else {
      return undefined;
    }
    return true;
  };

  return (
    <TouchableHighlight
      disabled={disabled}
      style={[styles.button, getTheme()[theme!], disabled ? styles.disabled : null, style]}
      onPress={handlePress}
    >
      <View style={styles.titleWrapper}>
        {icon && iconPosition === 'left' && <View style={[styles.icon, styles.iconLeft, iconClassName]}>{icon}</View>}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {icon && iconPosition === 'right' && <View style={[styles.icon, styles.iconRight, iconClassName]}>{icon}</View>}
      </View>
    </TouchableHighlight>
  );
};

export default Button;
