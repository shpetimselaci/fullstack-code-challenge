import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ApolloProvider } from "@apollo/client";

import { useColorScheme } from "@/hooks/useColorScheme";
import client from "@/clients/apollo";
import { GlobalContext } from "@/store/context/global";
import auth from "@/store/mobx/auth";
import useLoadStores from "@/hooks/useLoadStores";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const storesLoaded = useLoadStores();

  useEffect(() => {
    if (loaded && storesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, storesLoaded]);
  if (!loaded || !storesLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider value={{ auth }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName="auth">
            <Stack.Screen
              name="auth"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="question"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="user"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
}

export default RootLayout;
