import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tela1 from './src/Tela1';
import Tela2 from './src/Tela2';
import Login from './src/Login';
import NomeIdade from './src/01NomeIdade';
import AlturaPeso from './src/02AlturaPeso';
import Almoco from './src/03Almoco';
import Jantar from './src/04Jantar';
import Outros from './src/05Outros';
import Passos from './src/06Passos';
import IMC from './src/07IMC';
import Calorias from './src/08Calorias'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="01NomeIdade">
        <Stack.Screen name="01NomeIdade" component={NomeIdade} />
        <Stack.Screen name="02AlturaPeso" component={AlturaPeso} />
        <Stack.Screen name="03Almoco" component={Almoco} />
        <Stack.Screen name="04Jantar" component={Jantar} />
        <Stack.Screen name="05Outros" component={Outros} />
        <Stack.Screen name="06Passos" component={Passos} />
        <Stack.Screen name="07IMC" component={IMC} />
        <Stack.Screen name="08Calorias" component={Calorias} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
