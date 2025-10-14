import { useBackHandler, useKeyboard } from '@react-native-community/hooks';
import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Animated, Dimensions, Pressable, Text, View } from 'react-native';
import Button from '~UI/Button';
import CloseIcon from '~assets/close.svg';
import { CLOSE_ICON } from '~constants/dimensions';
import { SECONDARY } from '~constants/themes';
import colors from '~styles/colors';
import styles from './styles';

type SlideMenuProps = {
  isVisible: boolean;
  shouldAutoClose?: boolean;
  onClose: () => unknown;
  onPressHeaderButton?: () => unknown;
  children: ReactNode;
  menuHeight?: number;
  title?: string;
  headerButtonTitle?: string;
};

const SlideMenu = ({
  isVisible,
  onClose,
  shouldAutoClose,
  onPressHeaderButton = () => undefined,
  children,
  title,
  headerButtonTitle,
  menuHeight = 336
}: SlideMenuProps) => {
  const keyboard = useKeyboard();
  const windowHeight = Dimensions.get('screen').height; // full device height
  const [calculatedMenuHeight, setCalculatedMenuHeight] = useState(menuHeight);
  const [shouldDIsplay, setShouldDisplay] = useState(false);
  const [shouldDIsplayOverlay, setShouldDIsplayOverlay] = useState(false);
  const animatedHeight = useMemo(() => new Animated.Value(menuHeight), [menuHeight]);

  const hideModal = useCallback(() => {
    setShouldDIsplayOverlay(false);
    Animated.spring(animatedHeight, {
      useNativeDriver: true,
      toValue: calculatedMenuHeight,
      restSpeedThreshold: 100,
      restDisplacementThreshold: 40
    }).start(() => {
      onClose();
    });
  }, [animatedHeight, calculatedMenuHeight, onClose]);

  useBackHandler(() => {
    if (isVisible) {
      hideModal();
      return true;
    }
    return false;
  });

  useLayoutEffect(() => {
    const safeHeight = windowHeight; // keep small margin from top
    if (keyboard.keyboardShown) {
      const target = safeHeight - keyboard.keyboardHeight;
      setCalculatedMenuHeight(target < menuHeight ? target : menuHeight);
    } else {
      setCalculatedMenuHeight(safeHeight < menuHeight ? safeHeight : menuHeight);
    }
  }, [menuHeight, windowHeight, keyboard.keyboardHeight, keyboard.keyboardShown]);

  useEffect(() => {
    if (isVisible) {
      setShouldDisplay(true);
      setShouldDIsplayOverlay(true);
    } else {
      setShouldDisplay(false);
    }
  }, [isVisible, setShouldDisplay]);

  useEffect(() => {
    if (shouldAutoClose) {
      hideModal();
    }
  }, [shouldAutoClose, hideModal]);

  useEffect(() => {
    if (shouldDIsplay) {
      Animated.spring(animatedHeight, {
        useNativeDriver: true,
        toValue: 0
      }).start();
    }
  }, [shouldDIsplay, animatedHeight]);

  const shouldShowModal = shouldDIsplay;

  return (
    shouldShowModal && (
      <View style={styles.topWrapper}>
        {shouldDIsplayOverlay && (
          <Animated.View
            style={[
              {
                opacity: animatedHeight.interpolate({
                  inputRange: [100, 200],
                  outputRange: [0.5, 0],
                  extrapolate: 'clamp'
                })
              },
              styles.overlay
            ]}
          >
            <Pressable style={styles.tappableOverlay} onPress={hideModal} />
          </Animated.View>
        )}
        <Animated.View
          style={[
            {
              height: calculatedMenuHeight,
              transform: [{ translateY: animatedHeight }]
            },
            styles.animatedWrapper
          ]}
        >
          <View style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title} numberOfLines={1}>
                    {title}
                  </Text>
                  {headerButtonTitle ? (
                    <Button
                      style={styles.resetButton}
                      titleStyle={styles.titleStyle}
                      theme={SECONDARY}
                      title={headerButtonTitle}
                      onPress={onPressHeaderButton}
                    />
                  ) : null}
                </View>
                <Pressable onPress={hideModal}>
                  <View style={styles.closeIconWrapper}>
                    <CloseIcon width={CLOSE_ICON.width} height={CLOSE_ICON.height} fill={colors.neutral_medium} />
                  </View>
                </Pressable>
              </View>
              {children}
            </View>
          </View>
        </Animated.View>
      </View>
    )
  );
};

export default SlideMenu;
