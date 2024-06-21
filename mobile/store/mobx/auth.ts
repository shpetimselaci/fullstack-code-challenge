import { makeAutoObservable, runInAction } from "mobx";
import {
  hydrateStore,
  isHydrated,
  isPersisting,
  makePersistable,
} from "mobx-persist-store";
import storage from "expo-secure-store";

const safeStringifying = (value: string | object) => {
  try {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  } catch (error) {
    console.warn("Could not stringify object. Reason:", error);
    return null;
  }
};

const safeParsing = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

class AuthStore {
  isLoggedIn = false;

  user: {
    id: number;
    fullName: string;
    birthdate: string;
    createdAt: string;
    updatedAt: string;
  } | null = null;

  token: string = "";
  refreshToken: string = "";

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "authStore",
      properties: ["token", "refreshToken", "user"],
      storage: {
        async getItem(key) {
          let item = await storage.getItemAsync(key);
          if (typeof item === "string") {
            item = safeParsing(item);
          }

          return item;
        },
        async setItem(key, value) {
          const safeValue = await safeStringifying(value);
          if (safeValue == null) {
            return;
          }
          return storage.setItemAsync(key, safeValue);
        },

        removeItem(key) {
          return storage.deleteItemAsync(key);
        },
      },
    });
  }

  async hydrateStore() {
    await hydrateStore(this);
  }

  get isHydrated() {
    return isHydrated(this);
  }

  get isPersisting() {
    return isPersisting(this);
  }

  authenticateWith({
    refreshToken,
    token,
    user,
  }: {
    refreshToken: string;
    token: string;
    user: AuthStore["user"];
  }) {
    runInAction(() => {
      this.token = token;
      this.refreshToken = refreshToken;
      this.user = user;
    });
  }
}

export default new AuthStore();
