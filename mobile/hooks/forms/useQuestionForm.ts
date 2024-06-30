import * as z from "zod";
import { AddQuestionMutationVariables } from "@/gql/__generated__/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { GlobalContext } from "@/store/context/global";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION, EDIT_QUESTION } from "@/store/graphql/mutations";
import { GET_QUESTIONS } from "@/store/graphql/queries";

const schema = z
  .object({
    title: z.string().min(3),
    description: z.string().min(1),
  })
  .required();

export const useQuestionForm = (props: {
  defaultValues: (AddQuestionMutationVariables & { id?: number }) | null;
  edit?: boolean;
}) => {
  const addQueryMutation = useMutation(ADD_QUESTION, {
    refetchQueries: [GET_QUESTIONS],
  });

  const editQueryMutation = useMutation(EDIT_QUESTION, {
    variables: { questionAnswersId: props.defaultValues?.id },
    refetchQueries: [GET_QUESTIONS],
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: props.defaultValues || { title: "", description: "" },
  });
  const [mutation, { loading, data, error }] = props.edit
    ? editQueryMutation
    : addQueryMutation;

  const handleSubmit = (callBackFn?: () => void) =>
    form.handleSubmit(async (values) => {
      try {
        await mutation({ variables: values });
        callBackFn?.();
      } catch (error) {}
    });

  return { ...form, handleSubmit, loading, error, data };
};
