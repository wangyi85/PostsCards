import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../pages/Home";
import Posts from "../pages/Posts";

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name={'Home'} component={Home} />
                <Stack.Screen name={'Posts'} component={Posts} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
