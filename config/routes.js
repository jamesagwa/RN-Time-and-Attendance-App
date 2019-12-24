import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Container } from "native-base";
import { StatusBar } from "react-native";

// screens
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import LoginScreen from "../screens/Login";

// Auth screen
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const statusBarHeight = StatusBar.currentHeight;
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);
const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

const App = () => (
  <Container style={{ marginTop: statusBarHeight }}>
    <StatusBar backgroundColor="blue" barStyle="default" />
    <AppContainer />
  </Container>
);

export default App;
