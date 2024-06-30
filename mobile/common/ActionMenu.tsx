import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { ThemedButton } from "./ThemedButton";

export function Menu({ onPress }: { onPress: () => void }) {
  return (
    <ThemedButton
      icon={<FontAwesome name="" size={24} />}
      onPress={onPress}
      type="default"
      lightColor="transparent"
      darkColor="transparent"
      style={{ paddingRight: 0 }}
    />
  );
}
