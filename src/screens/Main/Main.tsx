import React, { useEffect } from 'react';

import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import BannerAd from '~/components/BannerAd';
import { ADD_LIST_ROUTE, ADD_TASK_ROUTE, EDIT_TASK_ROUTE, FULL_TASK_ROUTE, HOME_ROUTE } from '~constants/routes';
import Home from '~screens/Home';
import AddList from '~screens/Home/AddList';
import AddTask from '~screens/Home/AddTask';
import EditTask from '~screens/Home/EditTask';
import FullTask from '~screens/Home/FullTask';
import Modals from '~screens/Modals/Modals';

import ReviewPrompt from './ReviewPrompt';
import UpdateAppAlert from './UpdateAppAlert';

const MainContent = () => {
  const Stack = createStackNavigator();
  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={HOME_ROUTE} component={Home} options={{ headerShown: false }} />
            <Stack.Screen name={ADD_TASK_ROUTE} component={AddTask} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={ADD_LIST_ROUTE} component={AddList} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={FULL_TASK_ROUTE} component={FullTask} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={EDIT_TASK_ROUTE} component={EditTask} options={{ headerShown: false, presentation: 'modal' }} />
          </Stack.Navigator>
          <Modals />
          <UpdateAppAlert />
          <ReviewPrompt />
        </NavigationContainer>
      </SafeAreaView>
      <View style={{ paddingBottom: insets.bottom }}>
        <BannerAd />
      </View>
    </>
  );
};

const Main = () => {
  useEffect(() => {
    const isExpoGo = Constants.appOwnership === 'expo';
    if (!isExpoGo) {
      try {
        const { MobileAds } = require('yandex-mobile-ads');
        MobileAds.initialize();
      } catch (error) {
        console.warn('Yandex Mobile Ads not available:', error);
      }
    }
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <MainContent />
      </View>
    </SafeAreaProvider>
  );
};

export default Main;
