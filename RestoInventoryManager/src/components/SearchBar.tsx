import { TextInput } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="Search..."
      value={value}
      onChangeText={onChange}
    />
  );
}
