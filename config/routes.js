import React, { useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Container, Root } from "native-base";
import { StatusBar, Platform } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

// screens
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import LoginScreen from "../screens/Login";

// Auth screen
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import { useAppContext } from "./appContext";

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

const App = () => {
  const { setGeo } = useAppContext();

  useEffect(() => {
    async function getLocationAsync() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      let isGeofencing = await Location.hasStartedGeofencingAsync(
        "tamsGeofenceTask"
      );

      if (status !== "granted") {
        console.log("permission not granted!");
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });

      // if the geofencing tracker is not already running
      if (!isGeofencing) {
        await Location.startGeofencingAsync("tamsGeofenceTask", [
          {
            latitude: Number(location.coords.latitude),
            longitude: Number(location.coords.longitude),
            radius: Number(100) //in meters
          }
        ]);
      }
      setGeo(location);
    }
    getLocationAsync();

    return async () => await Location.stopGeofencingAsync("tamsGeofenceTask");
  }, []);

  return (
    <Root>
      <Container style={{ marginTop: statusBarHeight }}>
        <StatusBar backgroundColor="blue" barStyle="default" />
        <AppContainer />
      </Container>
    </Root>
  );
};

export default App;
