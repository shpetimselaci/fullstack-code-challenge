import * as z from "zod";
import { AddAnswerMutationVariables } from "@/gql/__generated__/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { ADD_ANSWER, EDIT_ANSWER } from "@/store/graphql/mutations";
import { GET_QUESTION_ANSWERS } from "@/store/graphql/queries";

const schema = z
  .object({
    answer: z.string().min(3),
  })
  .required();

export const useAnswerForm = (props: {
  defaultValues: (AddAnswerMutationVariables & { id?: number }) | null;
  edit?: boolean;
}) => {
  const addQueryMutation = useMutation(ADD_ANSWER, {
    variables: { questionId: props.defaultValues?.id },
    refetchQueries: [
      {
        query: GET_QUESTION_ANSWERS,
        variables: { questionId: props.defaultValues?.id },
      },
    ],
  });

  const editQueryMutation = useMutation(EDIT_ANSWER, {
    variables: {
      id: props.defaultValues?.id,
      questionId: props.defaultValues?.id,
    },
    refetchQueries: [
      {
        query: GET_QUESTION_ANSWERS,
        variables: { questionId: props.defaultValues?.id },
      },
    ],
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: props.defaultValues || { answer: "" },
  });
  const [mutation, { loading, data, error }] = props.edit
    ? editQueryMutation
    : addQueryMutation;

  const onSubmit = form.handleSubmit((values) => {
    mutation({ variables: values });
  });

  return { ...form, onSubmit, loading, error, data };
};
