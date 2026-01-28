import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  // Fake inventory data
  const criticalItems = [
    { name: "Rice", quantity: 2 },
    { name: "Chicken", quantity: 1 },
    { name: "Cooking Oil", quantity: 0 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi 👋</Text>
      <Text style={styles.subtitle}>
        Here are the items critical in quantity:
      </Text>

      {criticalItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>
            {item.name} — {item.quantity} left
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  item: {
    padding: 12,
    backgroundColor: "#ffe5e5",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
