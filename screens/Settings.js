import React, { useState, useEffect } from "react";
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
  Form,
  Item,
  Label,
  Input,
  H1,
  Icon,
  List,
  ListItem,
  Picker,
  Toast
} from "native-base";
import { AsyncStorage, Switch, View } from "react-native";
import netInfo from "@react-native-community/netinfo";
// import * as Location from "expo-location";

import LoginForm from "../components/LoginForm";
import updateDevice from "../api/updateDevice";
import updateAttendance from "../api/updateAttendance";
import { useAppContext } from "../config/appContext";
import { defaultSettings, fingers } from "../config/defaults";

function SettingsScreen({ navigation }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [settings, setSettings] = useState({});
  const { geo } = useAppContext();
  const {
    location: { coords, timestamp },
    predefinedLocations: places
  } = geo;

  useEffect(() => {
    // get settings for app on component mount
    const getSettings = async () => {
      const data = await AsyncStorage.getItem("settings");
      setSettings(JSON.parse(data) || defaultSettings);
    };

    getSettings();
  }, []);

  const handleSelectedPicker = value => setSelected(value);

  const handleSignout = async () => {
    // await Location.stopGeofencingAsync("tamsGeofenceTask");
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleReports = async () => {
    try {
      const attendance = await AsyncStorage.getItem("attendance");
      const result = await updateAttendance(JSON.parse(attendance));

      if (result) {
        Toast.show({
          text: "Attendance report sent successfully!",
          buttonText: "Okay",
          type: "success",
          duration: 3000
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const networkInfo = await netInfo.fetch();

    if (networkInfo.isInternetReachable) {
      await updateDevice(settings); //update remotely
    }

    await AsyncStorage.setItem("settings", JSON.stringify(settings));

    Toast.show({
      text: "Saved successfully!",
      buttonText: "Okay",
      type: "success",
      duration: 3000
    });
  };

  const handleReset = async () => {
    setSettings(defaultSettings);
    setSelected(undefined);
    await AsyncStorage.setItem("settings", JSON.stringify(defaultSettings));

    Toast.show({
      text: "Settings has been reset!",
      buttonText: "Okay",
      type: "warning",
      duration: 3000
    });
  };

  const style = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  };

  const formStyle = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <Content contentContainerStyle={formStyle} padder>
          <H1 style={{ alignSelf: "center", marginBottom: 30 }}>TAMS</H1>
          <Text style={{ alignSelf: "center" }}>Login with your details</Text>
          <LoginForm _setAuthenticated={setIsAuthenticated} />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              handleSignout();
              navigation.goBack();
            }}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Settings</Title>
        </Body>
      </Header>
      <Content padder>
        <List>
          <ListItem itemDivider>
            <Text>Finger selection</Text>
          </ListItem>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select scan finger"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selected}
                onValueChange={handleSelectedPicker}
              >
                {fingers.map((finger, index) => (
                  <Picker.Item
                    label={finger.label}
                    value={`finger${index + 1}`}
                    key={`key${index}`}
                  />
                ))}
              </Picker>
            </Item>
          </Form>
          {/* <ListItem>
            <View style={style}>
              <Text style={{ flex: 3 }}>Select scan finger</Text>
              <Switch
                style={{ flex: 1 }}
                onValueChange={value =>
                  setSettings(prevState => ({
                    fingerprint: {
                      ...prevState.fingerprint,
                      left: value
                    },
                    location: {
                      ...prevState.location
                    }
                  }))
                }
                value={
                  (settings.fingerprint ? settings : defaultSettings)
                    .fingerprint.left
                }
              />
            </View>
          </ListItem> */}
          <ListItem itemDivider>
            <Text>Set Location</Text>
          </ListItem>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select a location for device"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                // selectedValue={selected}
                // onValueChange={handleSelectedPicker}
              >
                {places.length > 0 &&
                  places.map(place => (
                    <Picker.Item
                      label={place.locationname}
                      value={`place${place.id}`}
                      key={`key${place.id}`}
                    />
                  ))}
              </Picker>
            </Item>
            {/* <Item inlineLabel>
              <Label>Place</Label>
              <Input
                onChangeText={text =>
                  setSettings(prevState => ({
                    fingerprint: {
                      ...prevState.fingerprint
                    },
                    location: {
                      ...prevState.location,
                      place: text
                    }
                  }))
                }
                defaultValue={
                  (settings.location ? settings : defaultSettings).location
                    .place
                }
              />
            </Item> */}
            <Item inlineLabel last>
              <Label>Lng</Label>
              <Input
                onChangeText={text =>
                  setSettings(prevState => ({
                    fingerprint: {
                      ...prevState.fingerprint
                    },
                    location: {
                      ...prevState.location,
                      lng: text
                    }
                  }))
                }
                defaultValue={
                  coords
                    ? String(coords.longitude)
                    : (settings.location ? settings : defaultSettings).location
                        .lng
                }
              />
            </Item>
            <Item inlineLabel last>
              <Label>Lat</Label>
              <Input
                onChangeText={text =>
                  setSettings(prevState => ({
                    fingerprint: {
                      ...prevState.fingerprint
                    },
                    location: {
                      ...prevState.location,
                      lat: text
                    }
                  }))
                }
                defaultValue={
                  coords
                    ? String(coords.latitude)
                    : (settings.location ? settings : defaultSettings).location
                        .lat
                }
              />
            </Item>
          </Form>
        </List>

        <View style={{ ...style, marginTop: 30 }}>
          <Button primary style={{ flex: 1 }} block onPress={handleSave}>
            <Text>Save</Text>
          </Button>
          <Button bordered style={{ flex: 1 }} block onPress={handleReset}>
            <Text>Reset</Text>
          </Button>
        </View>

        <Button style={{ marginTop: 30 }} block success onPress={handleReports}>
          <Text>Send latest report</Text>
        </Button>

        <Button style={{ marginTop: 30 }} block danger onPress={handleSignout}>
          <Text>Sign out</Text>
        </Button>
      </Content>
    </Container>
  );
}

SettingsScreen.propTypes = {};

export default SettingsScreen;
