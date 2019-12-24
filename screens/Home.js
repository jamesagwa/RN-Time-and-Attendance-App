import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Header,
  Content,
  Right,
  Icon,
  Body,
  Title,
  H1
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  const style = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>TAMS App</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("Settings")}>
            <Icon name="cog" />
          </Button>
        </Right>
      </Header>
      <Content padder contentContainerStyle={style}>
        <MaterialIcons name="fingerprint" size={135} />
        <H1 style={{ marginTop: 20 }}>Welcome</H1>
        <Text>Place thumb on scanner to scan</Text>
        <Text>...</Text>
      </Content>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  title: "Home"
};

HomeScreen.propTypes = {};

export default HomeScreen;
