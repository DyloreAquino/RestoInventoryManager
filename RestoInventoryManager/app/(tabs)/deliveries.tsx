import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import { ListView } from "@/src/components/ListView";
import { getDeliveries } from "@/src/db/deliveries";
import { Delivery as DeliveryInfo } from "@/src/types/deliveries";
import { formatDate } from "@/app/(tabs)/_layout";

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
    d.deliveryRider.toLowerCase().includes(query.toLowerCase()) || d.deliveryDate.toLowerCase().includes(query.toLowerCase())
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
            borderRadius: 15,
            padding: 12,
          }}>
            <View style={{ flexDirection: 'column', marginBottom: 4  }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Delivery on {formatDate(d.deliveryDate)}
              </Text>
              <Text style={{ flex: 1, fontSize: 18, marginTop: 4 }}>
                by {d.deliveryRider} @ {d.deliveryRiderNumber}
              </Text>

            </View>
          </View>
        )}
      />
    </View>
  );
}
