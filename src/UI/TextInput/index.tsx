import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { CLOSE_ICON } from '~constants/dimensions';
import CloseIcon from '~assets/close.svg';
import colors from '~styles/colors';
import styles from './styles';

type InputProps = {
  className?: StyleProp<ViewStyle>;
  wrapperClassName?: StyleProp<ViewStyle>;
  errorWrapperClassName?: StyleProp<ViewStyle>;
  onChangeText: (value: string) => unknown;
  value?: string;
  placeholder?: string;
  error?: string;
  shouldDisplayClearButton?: boolean;
  onClear: () => unknown;
  disabled?: boolean;
  secureTextEntry?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  validateable?: boolean;
  inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
};

const Input = ({
  value,
  onChangeText,
  placeholder,
  error,
  disabled,
  secureTextEntry,
  wrapperClassName,
  className,
  shouldDisplayClearButton,
  onClear,
  inputMode,
  validateable = true,
  numberOfLines = 1,
  multiline,
  errorWrapperClassName
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const onBlur = () => {
    if (!disabled) {
      setIsFocused(false);
    }
  };

  const handleChangeText = (value: string) => {
    if (!disabled) {
      onChangeText(value);
    }
  };

  return (
    <View style={[validateable ? styles.validateableWrapper : styles.wrapper, wrapperClassName]}>
      <View>
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral_medium}
          style={[
            styles.input,
            shouldDisplayClearButton && styles.inputWithClearButton,
            isFocused ? styles.focusedInput : null,
            error ? styles.errorInput : null,
            disabled ? styles.disabled : null,
            className
          ]}
          onChangeText={handleChangeText}
          value={value}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          inputMode={inputMode}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlign='left'
        />
        {shouldDisplayClearButton && (
          <Pressable onPress={onClear} style={styles.clearButtonWrapper}>
            <CloseIcon width={CLOSE_ICON.width} height={CLOSE_ICON.height} fill={isFocused ? colors.neutral_light : colors.neutral_medium} />
          </Pressable>
        )}
      </View>
      {validateable ? (
        <View style={[styles.errorWrapper, errorWrapperClassName]}>{!isEmpty(error) && <Text style={styles.errorText}>{error}</Text>}</View>
      ) : null}
    </View>
  );
};

export default Input;
