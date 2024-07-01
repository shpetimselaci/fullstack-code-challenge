import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedButton } from "./ThemedButton";
import { ThemedView } from "./ThemedView";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { ActionSheetIOS, TouchableOpacity, useColorScheme } from "react-native";
import { useState } from "react";

export function Menu({
  onPress,
  items,
  destructiveButtonIndex,
  cancelButtonIndex = 0,
}: {
  onPress: (item: { label: string; value: string }) => void;
  items: { label: string; value: string }[];
  cancelButtonIndex: number;
  destructiveButtonIndex?: number;
}) {
  const theme = useColorScheme() ?? "light";
  const [visible, setVisible] = useState(false);
  const handlePress = () => {
    setVisible(!visible);
  };

  const handleOnPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: items.map((item) => item.label),
        destructiveButtonIndex,
        cancelButtonIndex: cancelButtonIndex,
        userInterfaceStyle: "dark",
      },
      (index) => {
        onPress(items[index]);
      }
    );

  return (
    <ThemedView>
      <ThemedButton
        icon={
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="black"
          />
        }
        onPress={handleOnPress}
        type="default"
        lightColor="transparent"
        darkColor="transparent"
        style={{ paddingRight: 0 }}
      />
    </ThemedView>
  );
}
