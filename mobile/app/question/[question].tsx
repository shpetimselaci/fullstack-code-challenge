import { ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import {
  QuestionAnswersQuery,
  QuestionAnswersQueryVariables,
  Question as QuestionType,
} from "@/gql/__generated__/graphql";
import { ThemedText } from "@/common/ThemedText";
import { QueryResult, useQuery } from "@apollo/client";
import { GET_QUESTION_ANSWERS } from "@/store/graphql/queries";
import { FlatList } from "react-native-gesture-handler";
import { Answer } from "@/common/Answer";
import { ThemedView } from "@/common/ThemedView";
import { Question } from "@/common/Question";
import { useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { observer } from "mobx-react-lite";
import { HeaderBack } from "@/common/navigation/HeaderBack";
import { Menu } from "@/common/ActionMenu";

function Answers({
  loading,
  error,
  data,
}: QueryResult<QuestionAnswersQuery, QuestionAnswersQueryVariables>) {
  const navigation = useNavigation();

  const handleAvatarPress = (
    item: QuestionAnswersQuery["questionAnswers"][0]["author"]
  ) => {
    // @ts-ignore-next-line
    navigation.navigate({ name: `user/[user]`, params: item });
  };

  if (loading) {
    return (
      <ThemedText>
        Loading... <ActivityIndicator />
      </ThemedText>
    );
  }
  if (error) {
    return (
      <ThemedText>
        {(error && error.message) || "Something went wrong"}
      </ThemedText>
    );
  }

  return (
    <FlatList
      data={data?.questionAnswers}
      renderItem={({ item }) => (
        <Answer
          onAvatarPress={() => handleAvatarPress(item.author)}
          answer={item.answer}
          question={item.question}
          authorName={item.author.name}
          key={item.id}
        />
      )}
      ListEmptyComponent={
        <ThemedView>
          <ThemedText>No answers done yet!!</ThemedText>
        </ThemedView>
      }
    />
  );
}

function QuestionScreen() {
  const { uiStore } = useContext(GlobalContext);
  const local = useLocalSearchParams();
  const selectedQuestion = uiStore.selectedQuestion as QuestionType;
  const queryResult = useQuery(GET_QUESTION_ANSWERS, {
    variables: { questionAnswersId: Number(selectedQuestion.id) },
  });
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.actionContainer}>
        <HeaderBack />
        <Menu onPress={() => {}} />
      </ThemedView>
      <Question
        type="borderless"
        authorName={uiStore.selectedQuestion?.author.name}
        title={local.title as string}
        description={local.description as string}
        onAvatarPress={() => {}}
        onPress={() => {}}
      />
      <Answers {...queryResult} />
    </ThemedSafeAreaView>
  );
}

export default observer(QuestionScreen);

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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
