import { ThemedView } from "@/common/ThemedView";
import { ThemedInput } from "@/common/ThemedInput";
import { useQuestionForm } from "@/hooks/forms/useQuestionForm";
import { Controller } from "react-hook-form";

export function QuestionForm({
  control,
}: Pick<ReturnType<typeof useQuestionForm>, "control">) {
  return (
    <ThemedView style={{ paddingTop: 20 }}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedInput
            type="title"
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={fieldState?.error?.message}
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedInput
            type="defaultSemiBold"
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={fieldState?.error?.message}
          />
        )}
        name="description"
      />
    </ThemedView>
  );
}
