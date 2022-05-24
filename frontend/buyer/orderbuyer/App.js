import React, { Button } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './features/rootReducer';
import { ProjectContextProvider } from "./configs/ProjectContext";
import HomeScreen from "./screens/Home";
import StoreList from './screens/StoresScreen/StoreList';
import Store from './screens/StoresScreen/Store';



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
              title: 'Order - Buyer',
              headerLeft: () => null,
              //HomeDrawer: DrawerNav,
            })} />
          <AuthStackNavigation.Screen name="StoreList" component={StoreList} />
          <AuthStackNavigation.Screen name="Store" component={Store} />
            </AuthStackNavigation.Navigator>
        </NavigationContainer>
      </Provider>
    </ProjectContextProvider>
  );
}
