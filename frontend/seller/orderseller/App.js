import React, { Button } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './features/rootReducer';
import { ProjectContextProvider } from "./configs/ProjectContext";
import HomeScreen from "./screens/Home";



const store = configureStore({
  reducer: rootReducer
});
const AuthStackNavigation = createStackNavigator();
export default function App() {
  return (
    <ProjectContextProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStackNavigation.Navigator /* initialRouteName="ChargingSchedule" */>

            <AuthStackNavigation.Screen name="Login" component={LoginScreen} />
            <AuthStackNavigation.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
              title: 'Hexa V2X',
              headerLeft: () => null,
              //HomeDrawer: DrawerNav,
            })} />
          
            </AuthStackNavigation.Navigator>
        </NavigationContainer>
      </Provider>
    </ProjectContextProvider>
  );
}
