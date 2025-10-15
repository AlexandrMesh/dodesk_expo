import { DeviceEventEmitter } from 'react-native';

const EVENT = 'banner_height_changed';

let currentBannerHeight = 0;

export const getBannerHeight = (): number => currentBannerHeight;

export const setBannerHeight = (height: number): void => {
  if (Number.isFinite(height) && height !== currentBannerHeight) {
    currentBannerHeight = height;
    DeviceEventEmitter.emit(EVENT, currentBannerHeight);
  }
};

export const subscribeBannerHeight = (listener: (h: number) => void) => {
  const sub = DeviceEventEmitter.addListener(EVENT, listener);
  return () => sub.remove();
};
