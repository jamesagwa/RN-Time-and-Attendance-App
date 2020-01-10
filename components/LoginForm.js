import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Item, Input, Label, Button, Text, Toast } from "native-base";
import { AsyncStorage } from "react-native";
import uuid from "uuid/v1";
import { useForm } from "react-hook-form";

import { useAppContext } from "../config/appContext";
import { adminData } from "../api/mock";

function LoginForm({ _setAuthenticated }) {
  const { geo } = useAppContext();
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

  const handleSignin = async ({ username, password }) => {
    const {
      location: { coords, timestamp }
    } = geo;

    if (
      String(username) == adminData.uname &&
      String(password) == adminData.pword
    ) {
      // login details correct
      await AsyncStorage.setItem(
        "token",
        JSON.stringify({
          admin: {
            id: adminData.adminid,
            username: adminData.uname
          },
          deviceLocation: {
            place: adminData.location,
            lat: coords && coords.latitude,
            lng: coords && coords.longitude
          },
          deviceId: adminData.deviceid,
          timestamp
        })
      );
      _setAuthenticated(true);
    } else {
      // login details wrong
      Toast.show({
        text:
          "Admin not found! Username and/or password is not correct. Please check and try again",
        buttonText: "Okay",
        type: "danger",
        duration: 3000
      });
    }
  };

  return (
    <Form>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input onChangeText={text => setValue("username", text)} />
      </Item>
      <Item floatingLabel last>
        <Label>Password</Label>
        <Input onChangeText={text => setValue("password", text)} />
      </Item>
      <Button
        style={{ marginTop: 40 }}
        block
        onPress={handleSubmit(handleSignin)}
      >
        <Text>Sign in</Text>
      </Button>
    </Form>
  );
}

LoginForm.propTypes = {
  navigation: PropTypes.object
};

export default LoginForm;
