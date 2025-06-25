import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ServicoCreateScreen from '../screens/ServicoCreateScreen';
import ListaServicosScreen from '../screens/ListaServicosScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CadastrarServico" component={ServicoCreateScreen} />
      <Stack.Screen name="ListaServicos" component={ListaServicosScreen} />
    </Stack.Navigator>
  );
}
