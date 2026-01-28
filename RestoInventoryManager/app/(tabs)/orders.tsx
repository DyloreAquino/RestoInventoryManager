import { View, Text } from "react-native";
import React, { use, useEffect, useState } from "react";
import { SearchBar } from "@/src/components/SearchBar";
import { ListView } from "@/src/components/ListView";
import { getOrders, getOrderDishes } from "@/src/db/orders";
import { Order as OrderInfo } from "@/src/types/orders";
import { formatDate } from "@/app/(tabs)/_layout";

export default function OrderScreen() {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [orderDishes, setOrderDishes] = useState<any[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadOrders() {
      const data = await getOrders();
      setOrders(data);
    }

    loadOrders();
  }, []);

  useEffect(() => {
    async function loadOrderDishes() {
      const allDishes = [];
      for (const order of orders) {
        const dishes = await getOrderDishes(order.id);
        allDishes.push({ orderId: order.id, dishes });
      }
      setOrderDishes(allDishes);
    }
    if (orders.length > 0) {
      loadOrderDishes();
    }
  }, [orders]);

  const filteredOrders = orders.filter((o) =>
    o.orderDate.toLowerCase().includes(query.toLowerCase())
  );

  const filteredOrderDishes = orderDishes.filter((od) =>
    filteredOrders.some((o) => o.id === od.orderId)
  );

  return (
    <View style={{ padding: 20 }}>

      <SearchBar value={query} onChange={setQuery} />

      <ListView<OrderInfo>
        data={filteredOrders}
        keyExtractor={(o) => o.id.toString()}
        renderItem={(o) => {
          const dishesForOrder = filteredOrderDishes.find(od => od.orderId === o.id)?.dishes || [];
          const isExpanded = expandedOrderId === o.id;
          
          return (
            <View 
              style={{
                backgroundColor: '#ebebeb',
                marginVertical: 4,
                borderRadius: 15,
                padding: 12,
              }}
              onTouchEnd={() => setExpandedOrderId(isExpanded ? null : o.id)}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Order on {formatDate(o.orderDate)} {isExpanded ? '▼' : '▶'}
              </Text>
              {isExpanded && (
                <Text style={{ flex: 1, fontSize: 18, marginTop: 4 }}>
                  Dishes: {dishesForOrder.map((d: any) => {
                    const dishName = d.name || d.dishName;
                    const quantity = d.quantity || 1;
                    return `${dishName} (x${quantity})`;
                  }).join(', ')}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}
