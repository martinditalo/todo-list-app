import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TodoList } from "../pages/todo-list";
import { Login } from "../pages/login";
const Stack = createNativeStackNavigator();
export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Todo Application Login",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="Todo" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
