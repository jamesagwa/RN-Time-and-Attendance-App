import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as LocalAuthentication from "expo-local-authentication";
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
  Toast,
  H1
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  // scan data
  const userData = {
    userName: "",
    timestamp: new Date().toISOString(),
    userLocation: {
      place: "",
      lng: "",
      lat: ""
    }
  };

  useEffect(() => {
    if (globalThis.isWithinGeofence && !globalThis.isWithinGeofence.success) {
      Toast.show({
        text:
          "You've moved out of this device's location! This device will not be able to scan",
        buttonText: "Okay",
        type: "danger",
        duration: 3000
      });
    } else {
      (async () => {
        try {
          const hasScanOnDevice = await LocalAuthentication.hasHardwareAsync();
          const deviceScanType = await LocalAuthentication.supportedAuthenticationTypesAsync();

          if (hasScanOnDevice && deviceScanType === 1) {
            let result = await LocalAuthentication.authenticateAsync();
            console.log(result);
          }
        } catch (error) {
          console.error(error.message);
        }
      })();
    }
  }, [globalThis.isWithinGeofence]);

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
        <H1 style={{ marginTop: 20 }}>CLOCK IN</H1>
        <Text>Place thumb on scanner to scan</Text>
        <Text>...</Text>
      </Content>
    </Container>
  );
}

HomeScreen.navigationOptions = {
  title: "Home"
};

HomeScreen.propTypes = {
  navigation: PropTypes.object
};

export default HomeScreen;
