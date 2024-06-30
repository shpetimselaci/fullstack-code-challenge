import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { Avatar } from "./Avatar";
import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";

export const Question: React.FC<{
  authorName?: string;
  title: string;
  description: string;
  onAvatarPress?: () => void;
  onPress?: () => void;
  type?: 'default' | 'borderless'
}> = ({ authorName, title, description, onAvatarPress, onPress, type = 'default' }) => {
  return (
    <TouchableOpacity style={[styles.opacity, styles[type]]} onPress={onPress}>
      <ThemedView style={styles.titleContainer}>
        <Avatar size={32} name={authorName} onPress={onAvatarPress} />
        <ThemedText style={styles.title}>{authorName}</ThemedText>
      </ThemedView>
      <ThemedText type="link">{title}</ThemedText>
      <ThemedText type="description">{description}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  opacity: {
    flexGrow: 1,
    borderRadius: 6,
    padding: 10,
    width: "100%",
    marginTop: 10,
  },
  default: {
    borderWidth: 1,
  },
  borderless: {

  },
  titleContainer: { flexDirection: "row", flexGrow: 1, alignItems: "center" },
  title: { marginLeft: 4 },
});
