import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import { Question as QuestionType } from "@/gql/__generated__/graphql";
import { ThemedText } from "@/common/ThemedText";

export default function QuestionScreen() {
  const local = useLocalSearchParams<QuestionType & { id: string }>();
  const userId = Number(local.id);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>Question goes here!</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 10,
    gap: 4,
  },
});
