import {
  Image,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { HelloWave } from "@/common/HelloWave";
import ParallaxScrollView from "@/common/ParallaxScrollView";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "@/store/graphql/queries";
import { FlatList } from "react-native-gesture-handler";

const Question: ListRenderItem<any> = ({ item }) => {
  return (
    <ThemedView>
      <ThemedText type="title">{item.fullName}</ThemedText>
    </ThemedView>
  );
};

export default function HomeScreen() {
  const dimensions = useWindowDimensions();

  const { loading, error, data } = useQuery(GET_QUESTIONS);
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
      <FlatList data={data} renderItem={Question} />
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
