import {
  ActivityIndicator,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/common/ThemedView";
import { ThemedText } from "@/common/ThemedText";
import { ThemedSafeAreaView } from "@/common/ThemedSafeAreaView";
import {
  Answer as AnswerType,
  User as UserType,
  Question as QuestionType,
} from "@/gql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { GET_USER_ANSWERS, GET_USER_QUESTIONS } from "@/store/graphql/queries";
import { HeaderBack } from "@/common/navigation/HeaderBack";
import { formatDistanceToNow, format, fromUnixTime } from "date-fns";
import { ThemedTabs } from "@/common/ThemedTabs";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import { Avatar } from "@/common/Avatar";
import { Question } from "@/common/Question";
import { Answer } from "@/common/Answer";

function UserQuestionsTab({ userId }: { userId: number }) {
  const { loading, data, error } = useQuery(GET_USER_QUESTIONS, {
    variables: { userId, limit: 10, offset: 0 },
  });
  const navigation = useNavigation();

  const handleAvatarPress = (item: UserType) => {
    navigation.navigate(`/users/[user]`, item);
  };
  const handleQuestionPress = (item: QuestionType) => {
    navigation.navigate(`question/[question]`, item.question);
  };
  if (loading) {
    return (
      <ThemedText>
        Loading... <ActivityIndicator />{" "}
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
      data={data?.userQuestions}
      renderItem={({ item }) => (
        <Question
          authorName={item.author.name}
          onPress={handleQuestionPress}
          onAvatarPress={handleAvatarPress}
          title={item.title}
          description={item.description}
        />
      )}
      style={styles.tab}
      ListEmptyComponent={
        <ThemedView>
          <ThemedText>No questions yet!!</ThemedText>
        </ThemedView>
      }
    />
  );
}

function UserAnswersTab({ userId }: { userId: number }) {
  const navigation = useNavigation();
  const { loading, data, error } = useQuery(GET_USER_ANSWERS, {
    variables: { userId, limit: 10, offset: 0 },
  });

  const handleAvatarPress = (item: UserType) => {
    navigation.navigate(`/users/${item.id}`, { params: item });
  };
  const handleAnswerPress = (item: AnswerType) => {
    navigation.navigate(`questions/${item.question.id}`, {
      params: {
        answer: item,
        question: item.question,
      },
    });
  };

  if (loading) {
    return (
      <ThemedText>
        Loading... <ActivityIndicator />{" "}
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
      style={styles.tab}
      data={data?.userAnswers}
      renderItem={({ item }) => (
        <Answer
          onPress={() => {}}
          onAvatarPress={() => {}}
          answer={item.answer}
          question={item.question}
          authorName={item.author.name}
          replyTo
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

const tabs = ["questions", "answers"] as const;

const DisplayOnlyOne: React.FC<React.PropsWithChildren<{ show: boolean }>> = ({
  show,
  children,
}) => {
  return <View style={{ display: show ? "flex" : "none" }}>{children}</View>;
};

export default function UserScreen() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const local = useLocalSearchParams<User & { id: string }>();
  const userId = Number(local.id);
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab as (typeof tabs)[number]);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <HeaderBack />

        <ThemedText type="subtitle">User information</ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <Avatar size={96} name={local.name!} />
        <ThemedText type="subtitle">{local.name}</ThemedText>

        <ThemedText>
          <ThemedText type="defaultSemiBold">
            {formatDistanceToNow(local.birthday!)} old (
            {format(local.birthday!, "MM-dd-yyyy")}).
          </ThemedText>
        </ThemedText>
        <ThemedText>
          Joined the clinic at{" "}
          <ThemedText type="defaultSemiBold">
            {format(fromUnixTime(Number(local.createdAt)), "MMM d 'at' h:m a")}
          </ThemedText>
        </ThemedText>
        <ThemedTabs onTabPress={handleActiveTab} tabs={tabs} />

        <DisplayOnlyOne show={activeTab === tabs[0]}>
          <UserQuestionsTab userId={userId} />
        </DisplayOnlyOne>
        <DisplayOnlyOne show={activeTab === tabs[1]}>
          <UserAnswersTab userId={userId} />
        </DisplayOnlyOne>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 10,
    gap: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
