import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { WizardProvider } from './src/context/WizardContext';
import RootStack from './src/navigation/RootStack';

export default function App() {
  return (
    <WizardProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootStack />
      </NavigationContainer>
    </WizardProvider>
  );
}
