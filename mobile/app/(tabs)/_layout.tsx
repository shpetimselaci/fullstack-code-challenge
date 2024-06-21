import { Redirect, Tabs } from "expo-router";
import React, { useContext } from "react";

import { TabBarIcon } from "@/common/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GlobalContext } from "@/store/context/global";
import { observer } from "mobx-react-lite";

function TabLayout() {
  const colorScheme = useColorScheme();

  const { auth } = useContext(GlobalContext);

  if (!auth.isLoggedIn) {
    return <Redirect href="auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "man" : "man-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default observer(TabLayout);
