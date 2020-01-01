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
  Form,
  Item,
  Label,
  Input,
  Icon,
  List,
  ListItem,
  Toast
} from "native-base";
import { AsyncStorage, Switch, View } from "react-native";
import * as Location from "expo-location";

function SettingsScreen({ navigation }) {
  const handleSignout = async () => {
    await Location.stopGeofencingAsync("tamsGeofenceTask");
    await AsyncStorage.removeItem("token");
    navigation.navigate("Auth");
  };

  const style = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
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
        <List>
          <ListItem itemDivider>
            <Text>Finger selection</Text>
          </ListItem>
          <ListItem>
            <View style={style}>
              <Text style={{ flex: 3 }}>Enable left hand fingers</Text>
              <Switch
                style={{ flex: 1 }}
                onValueChange={evt => console.log(evt)}
              />
            </View>
          </ListItem>
          <ListItem>
            <View style={style}>
              <Text style={{ flex: 3 }}>Enable right hand fingers</Text>
              <Switch
                style={{ flex: 1 }}
                onValueChange={evt => console.log(evt)}
              />
            </View>
          </ListItem>
          <ListItem itemDivider>
            <Text>Set Location</Text>
          </ListItem>
          <Form>
            <Item inlineLabel>
              <Label>Place</Label>
              <Input />
            </Item>
            <Item inlineLabel last>
              <Label>Lng</Label>
              <Input />
            </Item>
            <Item inlineLabel last>
              <Label>Lat</Label>
              <Input />
            </Item>
          </Form>
        </List>

        <View style={{ ...style, marginTop: 30 }}>
          <Button
            primary
            style={{ flex: 1 }}
            block
            onPress={() =>
              Toast.show({
                text: "Saved successfully!",
                buttonText: "Okay",
                type: "success",
                duration: 3000
              })
            }
          >
            <Text>Save</Text>
          </Button>
          <Button
            bordered
            style={{ flex: 1 }}
            block
            onPress={() =>
              Toast.show({
                text: "Settings has been reset!",
                buttonText: "Okay",
                type: "warning",
                duration: 3000
              })
            }
          >
            <Text>Reset</Text>
          </Button>
        </View>

        <Button
          style={{ marginTop: 30 }}
          block
          danger
          onPress={() => handleSignout()}
        >
          <Text>Sign out</Text>
        </Button>
      </Content>
    </Container>
  );
}

SettingsScreen.propTypes = {};

export default SettingsScreen;
