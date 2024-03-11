import { useState } from "react";

import { View, StyleSheet } from "react-native";
import { TextInput, Button,Card } from "react-native-paper";
import { useLogin } from "../../queries/Login";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const usernames = login?.data?.map((data) => {
    return data.username;
  });
  const passwords = login?.data?.map((data) => {
    return data.password;
  });

  const LoginSubmit = () => {
    if (usernames?.includes(username) && passwords?.includes(password)) {
      alert("Login Successfully");
      navigation.navigate("Todo");
    } else {
      alert("Incorrect Username or Password");
    }
  };

  return (
    <>
      <View style={styles.container}>
        
       <Card style={{padding: 30}}>
          <TextInput
            style={{ width: 250 }}
            label="Username"
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={{ width: 250, height: 50, marginTop: 15 }}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <Button
            style={{ borderRadius: 5, marginTop: 20 }}
            mode="contained"
            onPress={LoginSubmit}
          >
            Login
          </Button>
          </Card>
        </View>
    
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50
  },
});

export default Login;
