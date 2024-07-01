import { Question } from "@/gql/__generated__/graphql";
import { makeAutoObservable } from "mobx";

class UIStore {
  selectedQuestion: Question | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedQuestion(question: Question) {
    this.selectedQuestion = question;
  }
}

export default new UIStore();
