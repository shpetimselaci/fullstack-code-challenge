import { Image, ListRenderItem, StyleSheet } from "react-native";

import { HelloWave } from "@/common/HelloWave";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "@/store/graphql/queries";
import { FlatList } from "react-native-gesture-handler";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";

const Question: ListRenderItem<any> = ({ item }) => {
  return (
    <ThemedView>
      <ThemedText type="title">{item.fullName}</ThemedText>
    </ThemedView>
  );
};

export default function HomeScreen() {
  const { loading, error, data, refetch } = useQuery(GET_QUESTIONS);

  return (
    <ThemedSafeAreaView>
      <Image
        source={require("@/assets/images/otter.png")}
        style={[styles.otter]}
      />
      <FlatList
        data={data?.questions}
        refreshing={loading}
        renderItem={Question}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          onPress={() => refetch({ limit: 10, offset: 0 })}
        >
          Questions from people!!
        </ThemedText>
        <HelloWave />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  otter: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    position: "absolute",
  },
});
