import authClient from "@/clients/auth";
import auth from "@/store/mobx/auth";
import { router } from "expo-router";

export default function userAuth() {
  async function authenticate(userId: number) {
    const user = await authClient.login(userId);

    auth.authenticateWith(user);

    router.navigate("tabs");
  }
  return {
    authenticate,
  };
}
