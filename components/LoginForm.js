import React from "react";
import PropTypes from "prop-types";
import { Form, Item, Input, Label, Button, Text } from "native-base";
import { AsyncStorage } from "react-native";
import uuid from "uuid/v1";

function LoginForm({ navigation }) {
  const handleSignin = async () => {
    const deviceId = uuid();
    await AsyncStorage.setItem(
      "token",
      JSON.stringify({
        authToken:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        deviceId,
        timestamp: Date.now()
      })
    );
    navigation.navigate("App");
  };

  return (
    <Form>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Password</Label>
        <Input />
      </Item>
      <Button style={{ marginTop: 40 }} block onPress={() => handleSignin()}>
        <Text>Sign in</Text>
      </Button>
    </Form>
  );
}

LoginForm.propTypes = {
  navigation: PropTypes.object
};

export default LoginForm;
