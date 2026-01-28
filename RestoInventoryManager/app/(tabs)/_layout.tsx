import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: "Orders" }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{ title: "Deliveries" }}
      />
    </Tabs>
  );
}
