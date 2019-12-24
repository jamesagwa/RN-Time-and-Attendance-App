import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { Container, Text } from "native-base";

function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      navigation.navigate(token ? "App" : "Auth");
    })();
  }, []);

  return (
    <Container>
      <ActivityIndicator />
      <Text>Loading...</Text>
    </Container>
  );
}

AuthLoadingScreen.propTypes = {};

export default AuthLoadingScreen;
