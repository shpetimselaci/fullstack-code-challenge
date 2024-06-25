import {
  ActivityIndicator,
  Image,
  ListRenderItem,
  StyleSheet,
} from "react-native";

import { HelloWave } from "@/common/HelloWave";
import { ThemedText } from "@/common/ThemedText";
import { ThemedView } from "@/common/ThemedView";
import { useQuery } from "@apollo/client";
import { GET_QUESTIONS } from "@/store/graphql/queries";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import { QuestionsQuery } from "@/gql/__generated__/graphql";
import { Link } from "expo-router";

const Question: ListRenderItem<QuestionsQuery["questions"][0]> = ({ item }) => {
  return (
    <ThemedView style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
      <Link href={`/question/${item.id}`}>
        <ThemedText type="link">{item.title}</ThemedText>
      </Link>
      <ThemedText type="description">{item.description}</ThemedText>
    </ThemedView>
  );
};

export default function HomeScreen() {
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_QUESTIONS, {
    variables: { offset: 0, limit: 10 },
  });

  return (
    <ThemedSafeAreaView>
      <Image
        source={require("@/assets/images/otter.png")}
        style={[styles.otter]}
      />
      <FlatList
        data={data?.questions}
        renderItem={Question}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refetch({ limit: 10, offset: 0 })}
          />
        }
        ListFooterComponent={
          <ActivityIndicator animating={loading} hidesWhenStopped />
        }
        ListHeaderComponent={
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Questions from people!!</ThemedText>
            <HelloWave />
          </ThemedView>
        }
        onEndReached={() =>
          fetchMore({ variables: { offset: data?.questions?.length } })
        }
      />
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
