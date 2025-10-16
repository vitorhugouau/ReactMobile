import { createStackNavigator } from '@react-navigation/stack';
import DetalhesHerois from '../pages/ex11/DetalhesHerois';
import HomeHerois from '../pages/ex11/HomeHerois';

const Stack = createStackNavigator(); 

const NavigationHeroesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeHerois} options={{ title: 'Home' }} />
      <Stack.Screen name="Details" component={DetalhesHerois} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
};

export default NavigationHeroesStack;