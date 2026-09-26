// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>
      {Platform.OS === 'web' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100%;
                display: flex;
                flex-direction: column;
              }

              /* Remove Firefox default focus ring inside buttons */
              button::-moz-focus-inner {
                border: 0 !important;
                padding: 0 !important;
              }

              /* Remove focus outline on buttons and clickable triggers */
              button,
              button:focus,
              button:focus-visible,
              [role="button"]:focus,
              [role="button"]:focus-visible {
                outline: none !important;
                box-shadow: none !important;
              }

              /* Suppress Firefox invalid pseudo-class borders */
              :not(output):-moz-ui-invalid,
              :not(output):-moz-ui-invalid:-moz-focusring {
                outline: none !important;
                box-shadow: none !important;
              }

              input:invalid,
              textarea:invalid,
              select:invalid {
                outline: none !important;
                box-shadow: none !important;
              }
              /* Strip outline, focus ring, and box-shadow on menu items and clickable views */
[data-testid="menu-item"],
[data-testid="menu-item-title"],
div[tabindex],
div:focus,
div:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
            `,
          }}
        />
      )}
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="browse" />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
