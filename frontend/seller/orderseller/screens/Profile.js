import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {

  return (
    <View>
      
      <Button
        title="Sign out"
        style={styles.button}
        onPress={async () => {
          try {
            await AsyncStorage.setItem(
              "currentUserCredentials",
              JSON.stringify("")
            );
          } catch (error) {
            // Error saving data
          } finally {
            navigation.navigate("Login");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default Profile;