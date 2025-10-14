import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_APP_VERSION_URL } from '~constants/api';

const PREFIX = 'APP';

export const getAppInfo = createAsyncThunk(`${PREFIX}/getAppInfo`, async () => {
  try {
    const { data } = await axios({
      method: 'get',
      url: GET_APP_VERSION_URL,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      }
    });
    return {
      version: data?.version,
      updateUrl: data?.updateUrl
    };
  } catch (err) {
    return {
      error: 'endpointIsNotAvailable'
    };
  }
});
