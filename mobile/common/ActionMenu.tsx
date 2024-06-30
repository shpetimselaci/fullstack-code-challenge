import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ThemedButton } from "./ThemedButton";

export function Menu({ onPress }: { onPress: () => void }) {
  return (
    <ThemedButton
      icon={<MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />}
      onPress={onPress}
      type="default"
      lightColor="transparent"
      darkColor="transparent"
      style={{ paddingRight: 0 }}
    />
  );
}
