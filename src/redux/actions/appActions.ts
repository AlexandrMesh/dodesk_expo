import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkForAppUpdate } from '~utils/versionCheck';

const PREFIX = 'APP';

export const getAppInfo = createAsyncThunk(`${PREFIX}/getAppInfo`, async () => {
  try {
    const { hasUpdate, latestVersion, updateUrl } = await checkForAppUpdate();
    
    // Если нет обновления или не удалось получить версию, возвращаем ошибку
    if (!hasUpdate || !latestVersion) {
      return {
        error: 'endpointIsNotAvailable'
      };
    }

    return {
      version: latestVersion,
      updateUrl: updateUrl || null
    };
  } catch (err) {
    console.error('Error in getAppInfo:', err);
    return {
      error: 'endpointIsNotAvailable'
    };
  }
});
