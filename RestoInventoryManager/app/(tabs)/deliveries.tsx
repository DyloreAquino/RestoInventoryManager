import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import { ListView } from "@/src/components/ListView";
import { getDeliveries } from "@/src/db/deliveries";
import { Delivery as DeliveryInfo } from "@/src/types/deliveries";

export default function DeliveriesScreen() {
  const [deliveries, setDeliveries] = useState<DeliveryInfo[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadDeliveries() {
      const data = await getDeliveries();
      setDeliveries(data);
    }

    loadDeliveries();
  }, []);

  const filteredDeliveries = deliveries.filter((d) =>
    d.deliveryRider.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ padding: 20 }}>

      <SearchBar value={query} onChange={setQuery} />

      <ListView<DeliveryInfo>
        data={filteredDeliveries}
        keyExtractor={(d) => d.id.toString()}
        renderItem={(d) => (
          <View style={{
            backgroundColor: '#ebebeb',
            marginVertical: 4,
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 16, flex: 1 }}>{d.deliveryDate}</Text>
            <Text style={{ fontSize: 16, flex: 2 }}>{d.deliveryRider}</Text>
          </View>
        )}
      />
    </View>
  );
}
