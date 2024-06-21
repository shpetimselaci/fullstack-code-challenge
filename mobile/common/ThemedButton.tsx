import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export type ThemedButton = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "lg" | "xl" | "small";
  textType?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  textType,
  children,
  ...rest
}: ThemedButton) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "button");

  return (
    <TouchableOpacity
      {...rest}
      style={[
        style,
        styles.defaultStyling,
        styles[type],
        { backgroundColor: color },
      ]}
    >
      <ThemedText
        lightColor={Colors.dark.text}
        darkColor={Colors.light.text}
        type={textType}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyling: {
    borderRadius: 8,
  },
  default: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  xl: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
