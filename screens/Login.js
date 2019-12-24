import React from "react";
import PropTypes from "prop-types";
import { Container, Text, Content, H1 } from "native-base";

import LoginForm from "../components/LoginForm";

function LoginScreen({ navigation }) {
  const style = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  };

  return (
    <Container>
      <Content contentContainerStyle={style} padder>
        <H1 style={{ alignSelf: "center", marginBottom: 30 }}>TAMS</H1>
        <Text style={{ alignSelf: "center" }}>Login with your details</Text>
        <LoginForm navigation={navigation} />
      </Content>
    </Container>
  );
}

LoginScreen.navigationOptions = {
  headerMode: "none",
  headerBackTitleVisible: false
};

LoginScreen.propTypes = {};

export default LoginScreen;
