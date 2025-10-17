import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreens";
import ListaServicosScreen from "../screens/ListaServicosScreen";
import ServicoCreateScreen from "../screens/ServicoCreateScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="ListaServicos" 
        component={ListaServicosScreen}
        options={{ title: 'Serviços' }}
      />
      <Stack.Screen 
        name="ServicoCreate" 
        component={ServicoCreateScreen}
        options={{ title: 'Novo Serviço' }}
      />
    </Stack.Navigator>
  );
}