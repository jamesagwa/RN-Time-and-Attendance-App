import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Item, Input, Label, Button, Text } from "native-base";
import { AsyncStorage } from "react-native";
import uuid from "uuid/v1";
import { useForm } from "react-hook-form";
import * as Location from "expo-location";

import { useAppContext } from "../config/appContext";

function LoginForm({ navigation }) {
  const { geo } = useAppContext();
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

  const handleSignin = async ({ username, password }) => {
    const deviceId = uuid();
    const { coords, timestamp } = geo;
    const isGeofencing = await Location.hasStartedGeofencingAsync(
      "tamsGeofenceTask"
    );

    if (!isGeofencing) {
      await Location.startGeofencingAsync("tamsGeofenceTask", [
        {
          latitude: Number(coords.latitude),
          longitude: Number(coords.longitude),
          radius: Number(100) //in meters
        }
      ]);
    }

    await AsyncStorage.setItem(
      "token",
      JSON.stringify({
        admin: username,
        deviceLocation: {
          place: "",
          lat: coords.latitude,
          lng: coords.longitude
        },
        authToken:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        deviceId,
        timestamp
      })
    );
    navigation.navigate("App");
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
