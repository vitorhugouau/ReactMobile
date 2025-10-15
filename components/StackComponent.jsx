import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/ex10/HomeScreen';
import ProfileScreen from '../pages/ex10/ProfileScreen';
import SignUp from '../pages/ex10/SignUp';

const Stack = createStackNavigator(); 

const NavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Login" component={ProfileScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
};

export default NavigationStack;