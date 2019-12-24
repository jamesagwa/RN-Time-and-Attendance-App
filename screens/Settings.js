import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Header,
  Left,
  Body,
  Title,
  Content,
  Icon
} from "native-base";
import { AsyncStorage } from "react-native";

function SettingsScreen({ navigation }) {
  const handleSignout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Auth");
  };
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Settings</Title>
        </Body>
      </Header>
      <Content padder>
        <Text>Settings screen</Text>
        <Button block danger onPress={() => handleSignout()}>
          <Text>Sign out</Text>
        </Button>
      </Content>
    </Container>
  );
}

SettingsScreen.propTypes = {};

export default SettingsScreen;
