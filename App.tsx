import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from '~UI/Spinner/Spinner';
import i18n from './src/translations/i18n';
import { store, persistor } from './src/redux/store/configureStore';
import Main from './src/screens/Main';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  </I18nextProvider>
);

export default App;
