import { Image, StyleSheet } from "react-native";

import { HelloWave } from "@/common/HelloWave";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

const User = () => {
  return <ThemedView></ThemedView>;
};

export default function UsersScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <FlatList
        ListHeaderComponent={
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">List of users to go to</ThemedText>
            <HelloWave />
          </ThemedView>
        }
        data={[]}
        renderItem={User}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
