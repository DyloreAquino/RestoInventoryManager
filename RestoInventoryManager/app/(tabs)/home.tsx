import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getItems } from "../../src/db/items";
import { Item as ItemInfo } from "../../src/types/items";

export default function Home() {
  const [items, setItems] = useState<ItemInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getItems();
      setItems(data as ItemInfo[]);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  const critical = items.filter(i => i.quantity <= 5);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 28 }}>Hi!</Text>
      <Text style={{ fontSize: 18, marginTop: 16 }}>Critical Items:</Text>
      {critical.length === 0 ? <Text>All stocked!</Text> :
        <FlatList
          data={critical}
          keyExtractor={i => i.id.toString()}
          renderItem={({ item }) => <Text>{item.name}: {item.quantity}</Text>}
        />
      }
    </View>
  );
}
