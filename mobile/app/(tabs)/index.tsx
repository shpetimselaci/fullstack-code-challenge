import { Image, StyleSheet, useWindowDimensions } from "react-native";

import { HelloWave } from "@/common/HelloWave";
import ParallaxScrollView from "@/common/ParallaxScrollView";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";

export default function HomeScreen() {
  const dimensions = useWindowDimensions();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/otter.png")}
          style={[styles.otter, { width: dimensions.width }]}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Questions from people!</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  otter: {
    flex: 1,
    objectFit: "cover",
    position: "absolute",
  },
});
