import { ThemedView } from "@/common/ThemedView";
import { ThemedInput } from "@/common/ThemedInput";
import { Controller } from "react-hook-form";
import { useAnswerForm } from "@/hooks/forms/useAnswerForm";

export function AnswerForm({
  control,
  editable,
}: { editable: boolean } & Pick<ReturnType<typeof useAnswerForm>, "control">) {
  return (
    <ThemedView style={{ paddingTop: 20 }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            type="title"
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable={editable}
          />
        )}
        name="answer"
      />
    </ThemedView>
  );
}
