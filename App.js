import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import { Colors } from "./constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ManageExpensesScreen from "./screens/ManageExpensesScreen";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => {
        return {
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          headerRight: ({ tintColor }) => (
            <IconButton
              name="add"
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageExpenses");
              }}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 15,
          },
          sceneStyle: { backgroundColor: Colors.primary700 },
          tabBarStyle: { backgroundColor: Colors.primary500 },
          tabBarActiveTintColor: Colors.accent500,
        };
      }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ExpensesOverview"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpensesScreen}
              options={{
                title: "Manage Expenses",
                presentation: "modal",
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: "white",
                contentStyle: { backgroundColor: Colors.primary700 },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

export default App;
