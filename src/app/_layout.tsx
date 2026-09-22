// src/app/_layout.tsx
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        {/* Disable default header so Paper Appbar handles everything */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="browse" />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
