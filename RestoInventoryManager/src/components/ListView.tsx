import { FlatList, Pressable } from "react-native";
import React from "react";

type ListViewProps<T> = {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactElement;
  onItemPress?: (item: T) => void;
};

export function ListView<T>({
  data,
  keyExtractor,
  renderItem,
  onItemPress,
}: ListViewProps<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <Pressable 
          onPress={() => onItemPress?.(item)}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 }  // Mimics TouchableOpacity effect
          ]}
        >
          {renderItem(item)}
        </Pressable>
      )}
    />
  );
}