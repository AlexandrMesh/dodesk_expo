import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ADD_LIST_ROUTE, ADD_TASK_ROUTE, FULL_TASK_ROUTE, HOME_ROUTE } from '~constants/routes';
import Home from '~screens/Home';
import AddList from '~screens/Home/AddList';
import AddTask from '~screens/Home/AddTask';
import FullTask from '~screens/Home/FullTask';
import Modals from '~screens/Modals/Modals';

import ReviewPrompt from './ReviewPrompt';
import UpdateAppAlert from './UpdateAppAlert';

const Main = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={HOME_ROUTE} component={Home} options={{ headerShown: false }} />
            <Stack.Screen name={ADD_TASK_ROUTE} component={AddTask} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={ADD_LIST_ROUTE} component={AddList} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name={FULL_TASK_ROUTE} component={FullTask} options={{ headerShown: false, presentation: 'modal' }} />
          </Stack.Navigator>
          <Modals />
          <UpdateAppAlert />
          <ReviewPrompt />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Main;
