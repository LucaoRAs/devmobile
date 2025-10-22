import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useWizard } from '../context/WizardContext';
import { Alert } from 'react-native';

// Importar todas as telas
import NomeIdadeScreen from '../screens/NomeIdadeScreen';
import AlturaPesoScreen from '../screens/AlturaPesoScreen';
import AlmocoScreen from '../screens/AlmocoScreen';
import JantarScreen from '../screens/JantarScreen';
import OutrosScreen from '../screens/OutrosScreen';
import PassosScreen from '../screens/PassosScreen';
import IMCScreen from '../screens/IMCScreen';
import CaloriasScreen from '../screens/CaloriasScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createStackNavigator();

export default function RootStack() {
  const { state, loadDraft } = useWizard();

  React.useEffect(() => {
    if (state.hasDraft && !state.isLoading) {
      Alert.alert(
        'Continuar rascunho?',
        'Encontramos um rascunho salvo. Deseja continuar de onde parou?',
        [
          {
            text: 'Não',
            onPress: () => {
              // Não fazer nada, continuar com dados limpos
            },
          },
          {
            text: 'Sim',
            onPress: () => {
              loadDraft();
            },
          },
        ]
      );
    }
  }, [state.hasDraft, state.isLoading]);

  return (
    <Stack.Navigator
      initialRouteName="NomeIdade"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="NomeIdade" component={NomeIdadeScreen} />
      <Stack.Screen name="AlturaPeso" component={AlturaPesoScreen} />
      <Stack.Screen name="Almoco" component={AlmocoScreen} />
      <Stack.Screen name="Jantar" component={JantarScreen} />
      <Stack.Screen name="Outros" component={OutrosScreen} />
      <Stack.Screen name="Passos" component={PassosScreen} />
      <Stack.Screen name="IMC" component={IMCScreen} />
      <Stack.Screen name="Calorias" component={CaloriasScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
    </Stack.Navigator>
  );
}
