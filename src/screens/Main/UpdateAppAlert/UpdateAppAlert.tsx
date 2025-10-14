/* eslint-disable @typescript-eslint/no-explicit-any */
import Constants from 'expo-constants';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking } from 'react-native';

type UpdateAppAlertProps = {
  getAppInfo: () => Promise<any>;
};

const UpdateAppAlert = ({ getAppInfo }: UpdateAppAlertProps) => {
  const { t } = useTranslation('common');

  const createUpdateAppAlert = useCallback(
    (updateUrl: string) =>
      Alert.alert(t('common:updateAppVersionTitle'), t('common:updateAppVersionDescription'), [
        {
          text: t('common:cancel')
        },
        { text: t('common:update'), onPress: () => Linking.openURL(updateUrl) }
      ]),
    [t]
  );

  useEffect(() => {
    async function loadData() {
      try {
        const { error, version, updateUrl } = await getAppInfo();
        const currentAppVersion = (Constants?.expoConfig?.version || '').trim();
        const remoteVersion = (version || '').trim();
        if (!error && remoteVersion && currentAppVersion && remoteVersion !== currentAppVersion) {
          if (updateUrl) {
            createUpdateAppAlert(updateUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [getAppInfo, createUpdateAppAlert]);

  return null;
};

export default UpdateAppAlert;
