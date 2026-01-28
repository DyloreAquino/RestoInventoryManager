import { Tabs } from "expo-router";
import InitScreen from "../init"; // wrap the tabs with DB init

export default function Layout() {
  return (
    <InitScreen>
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="orders" options={{ title: "Orders" }} />
        <Tabs.Screen name="deliveries" options={{ title: "Deliveries" }} />
      </Tabs>
    </InitScreen>
  );
}