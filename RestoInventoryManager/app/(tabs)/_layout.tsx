import { Tabs } from "expo-router";
import InitScreen from "../init"; // wrap the tabs with DB init

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export default function Layout() {
  return (
    <InitScreen>
      <Tabs screenOptions={{ headerShown: true }}>
        <Tabs.Screen name="orders" options={{ title: "Orders" }} />
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="deliveries" options={{ title: "Deliveries" }} />
      </Tabs>
    </InitScreen>
  );
}
