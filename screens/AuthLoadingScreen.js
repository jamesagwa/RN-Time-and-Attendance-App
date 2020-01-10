import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, ActivityIndicator } from "react-native";
import { Container, Content } from "native-base";

function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      const activated = await AsyncStorage.getItem("activated");
      navigation.navigate(Boolean(activated) ? "App" : "Activation");
    })();
  }, []);

  const style = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <Container>
      <Content contentContainerStyle={style}>
        <ActivityIndicator />
      </Content>
    </Container>
  );
}

AuthLoadingScreen.propTypes = {};

export default AuthLoadingScreen;
