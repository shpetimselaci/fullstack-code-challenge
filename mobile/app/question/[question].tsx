import {
  ActivityIndicator,
  FlatListProps,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import {
  QuestionAnswersQuery,
  QuestionAnswersQueryVariables,
  Question as QuestionType,
} from "@/gql/__generated__/graphql";
import { ThemedText } from "@/common/ThemedText";
import { QueryResult, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION_ANSWERS } from "@/store/graphql/queries";
import { FlatList } from "react-native-gesture-handler";
import { Answer } from "@/common/Answer";
import { ThemedView } from "@/common/ThemedView";
import { Question } from "@/common/Question";
import React, { ComponentProps, useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { observer } from "mobx-react-lite";
import { HeaderBack } from "@/common/navigation/HeaderBack";
import { Menu } from "@/common/ActionMenu";
import { AnswerForm } from "@/forms/Answer";
import { useAnswerForm } from "@/hooks/forms/useAnswerForm";
import { DELETE_QUESTION } from "@/store/graphql/mutations";

const NewAnswer = React.memo(function NewAnswer({
  questionId,
}: {
  questionId: number;
}) {
  const form = useAnswerForm({ defaultValues: { questionId } });

  const handleSubmit = form.onSubmit(() => {
    form.reset({ questionId, answer: "" });
  });

  return (
    <AnswerForm
      control={form.control}
      editable
      loading={form.loading}
      onSubmit={handleSubmit}
    />
  );
});

function Answers({
  loading,
  error,
  data,
  ListHeaderComponent,
}: QueryResult<QuestionAnswersQuery, QuestionAnswersQueryVariables> &
  Pick<
    FlatListProps<QuestionAnswersQuery["questionAnswers"][number]>,
    "ListHeaderComponent"
  >) {
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
      style={{ height: "100%" }}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Answer
          onAvatarPress={() => handleAvatarPress(item.author)}
          answer={item.answer}
          question={item.question}
          authorName={item.author.name}
          createdAt={item.createdAt}
          key={item.id}
        />
      )}
      stickyHeaderIndices={[0, data?.questionAnswers?.length || 1]}
      ListEmptyComponent={
        <ThemedView>
          <ThemedText>No answers done yet!!</ThemedText>
        </ThemedView>
      }
    />
  );
}

const actionMenuItems = [
  { label: "Cancel", value: "cancel" },

  { label: "Edit post", value: "edit" },
  { label: "Delete post", value: "delete" },
];

const SelectedQuestion = observer(
  ({ selectedQuestion }: { selectedQuestion: QuestionType }) => {
    return (
      <ThemedView>
        <Question
          size="large"
          type="borderless"
          authorName={selectedQuestion?.author.name}
          title={selectedQuestion.title as string}
          description={selectedQuestion.description as string}
          onAvatarPress={() => {}}
          onPress={() => {}}
        />
      </ThemedView>
    );
  }
);

function QuestionScreen() {
  const { uiStore, auth } = useContext(GlobalContext);
  const navigation = useNavigation();
  const selectedQuestion = uiStore.selectedQuestion as QuestionType;
  const questionAnswersId = Number(selectedQuestion.id);
  const queryResult = useQuery(GET_QUESTION_ANSWERS, {
    variables: { questionAnswersId },
  });
  const [deleteMutation] = useMutation(DELETE_QUESTION, {
    variables: { questionId: questionAnswersId },
    refetchQueries: [
      { query: GET_QUESTION_ANSWERS, variables: { questionAnswersId } },
    ],
  });

  const handleOnPress = async (
    item: ComponentProps<typeof Menu>["items"][number]
  ) => {
    switch (item.value) {
      case "delete": {
        await deleteMutation();
        navigation.goBack();
        break;
      }
      case "edit": {
        // @ts-ignore-next-line
        navigation.navigate({ name: "question/new", params: { edit: true } });
      }
      default: {
        break;
      }
    }
  };
  return (
    <ThemedSafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ThemedView style={styles.actionContainer}>
        <HeaderBack />
        {selectedQuestion.author.id === auth?.user?.id && (
          <Menu
            onPress={handleOnPress}
            items={actionMenuItems}
            cancelButtonIndex={0}
            destructiveButtonIndex={2}
          />
        )}
      </ThemedView>
      <Answers
        ListHeaderComponent={
          <SelectedQuestion selectedQuestion={selectedQuestion} />
        }
        {...queryResult}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-65}>
        <ThemedView style={styles.input}>
          <NewAnswer questionId={questionAnswersId} />
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

export default observer(QuestionScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    position: "relative",
    justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 10,
    gap: 4,
  },
  actionContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: { marginBottom: 65 },
  list: {
    flexShrink: 0,
    paddingBottom: 80,
  },
});
