import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {route} from './utils/routes';
import {themes} from './utils/themes';

const Stack = createNativeStackNavigator();

function Router() {
  const schema = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={schema === 'dark' ? '#202020' : '#FEFBF7'}
        barStyle={schema === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer
        theme={schema === 'dark' ? themes.dark : themes.default}>
        <Stack.Navigator>
          {route.map(routes => (
            <Stack.Screen
              key={routes.key}
              name={routes.name}
              component={routes.component}
              options={routes.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Router;
