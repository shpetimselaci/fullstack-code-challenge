import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { Avatar } from "./Avatar";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Answer: React.FC<{
  onAvatarPress: () => void;
  onPress?: () => void;
  authorName: string;
  answer: string;
  question?: {
    title: string;
    description: string;
    author: {
      name: string;
    };
  };
  replyTo?: boolean;
}> = ({
  authorName,
  answer,
  onAvatarPress,
  onPress,
  question,
  replyTo,
}) => {
  return (
    <TouchableOpacity style={styles.opacity} onPress={onPress}>
      {replyTo ? (
        <ThemedView style={styles.replyContainer}>
          <Ionicons
            size={18}
            name="return-up-back-outline"
            style={styles.icon}
          />
          <ThemedText type="author">{question?.author.name}</ThemedText>
        </ThemedView>
      ) : null}
      <ThemedView style={styles.titleContainer}>
        <Avatar size={32} name={authorName} onPress={onAvatarPress} />
        <ThemedText style={styles.title}>{authorName}</ThemedText>
      </ThemedView>
      <ThemedText type="description">{answer}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  opacity: {
    borderWidth: 1,
    flexGrow: 1,
    borderRadius: 6,
    padding: 10,
    width: "100%",
    marginTop: 10,
  },
  replyContainer: { flexDirection: "row", flexGrow: 1, marginBottom: 4 },

  titleContainer: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
  },
  title: { marginLeft: 6 },
  icon: { marginRight: 4 },
});
