import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import {
  Container,
  Text,
  Button,
  Form,
  Content,
  Item,
  Icon,
  Label,
  Input,
  Picker,
  Toast,
  H1,
  List,
  ListItem
} from "native-base";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";

import updateDevice from "../api/updateDevice";
import { useAppContext } from "../config/appContext";
import getEmployeeDetails from "../api/getEmployeeDetails";

function ActivationScreen({ navigation }) {
  const [downloadingEmployees, setDownloadingEmployees] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const { geo } = useAppContext();

  useEffect(() => {
    register("name");
    register("serial");
    register("location");
  }, [register]);

  const style = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  };

  const fetchEmployees = async () => {
    const employeesData = await getEmployeeDetails(); //fetch employee details on app start
    await AsyncStorage("employees", JSON.stringify(employeesData));
  };

  const handleActivation = async values => {
    const data = await updateDevice({
      ...values,
      id: Constants.deviceId,
      //   gpsLocation: coords && `${coords.longitude},${coords.latitude}`,
      admin: "ebuka"
    });

    console.log(data);

    if (data) {
      await AsyncStorage.multiSet([
        ["activated", "true"],
        ["admin-data", JSON.stringify(data)]
      ]);

      setDownloadingEmployees(true);
    }
  };

  if (downloadingEmployees) {
    return (
      <AppLoading
        startAsync={fetchEmployees}
        onFinish={() => navigation.navigate("App")}
        onError={() =>
          Toast.show({
            text:
              "Error! There's a problem downloading employees. Please try again later",
            buttonText: "Okay",
            type: "danger",
            duration: 3000
          })
        }
      >
        <Text>Loading employees for device...</Text>
      </AppLoading>
    );
  }

  return (
    <Container>
      <Content contentContainerStyle={style} padder>
        <H1 style={{ alignSelf: "center", marginBottom: 10 }}>
          Register this Device
        </H1>
        <Text style={{ alignSelf: "center" }}>
          Registration is required to activate
        </Text>
        <Text style={{ alignSelf: "center", marginBottom: 30 }}>
          this device for scanning
        </Text>
        <Form>
          <Item inlineLabel>
            <Label>Device ID</Label>
            <Input defaultValue={Constants.deviceId} disabled />
          </Item>
          <Item inlineLabel>
            <Label>Device Name</Label>
            <Input onChangeText={text => setValue("name", text)} />
          </Item>
          <Item inlineLabel>
            <Label>Serial Number</Label>
            <Input onChangeText={text => setValue("serial", text)} />
          </Item>
          <List>
            <ListItem itemDivider>
              <Text>Location</Text>
            </ListItem>
          </List>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select a location for device"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              // selectedValue={selected}
              onValueChange={text => setValue("location", text)}
            >
              {geo.predefinedLocations &&
                geo.predefinedLocations.map(place => (
                  <Picker.Item
                    label={place.locationname}
                    value={`place${place.id}`}
                    key={`key${place.id}`}
                  />
                ))}
            </Picker>
          </Item>
          <Item inlineLabel last>
            <Label>GPS</Label>
            <Input
              disabled
              defaultValue={
                geo.location &&
                `${geo.location.coords.longitude},${geo.location.coords.latitude}`
              }
            />
          </Item>
          <Button
            style={{ marginTop: 40 }}
            block
            onPress={handleSubmit(handleActivation)}
          >
            <Text>Activate</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

ActivationScreen.propTypes = {};

export default ActivationScreen;
