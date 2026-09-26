// src/app/index.tsx
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  useColorScheme,
} from 'react-native';
import {
  Button,
  Card,
  MD3DarkTheme,
  MD3LightTheme,
  Text,
  useTheme,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CustomAppbarHeader } from '@/components/CustomAppbarHeader';
import { Surface, TouchableRipple } from 'react-native-paper';

import { ScrollView } from 'react-native';
import React from 'react';
const COLUMNS = 3;
const GAP = 12;
const PADDING = 18;
export default function Index() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = React.useState(0);
  const { width } = useWindowDimensions();

  const isSm = screenWidth >= 600;
  const itemWidth = isSm ? `${Math.floor(100 / COLUMNS - 2)}%` : '100%';

  return (
    <>
      <CustomAppbarHeader title="Demo 大學" />
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={styles.container}
      >
        <View style={[styles.grid, { gap: isSm ? GAP : 0 }]}>
          <Surface
            elevation={1}
            style={[
              styles.item,
              {
                width: itemWidth,
                aspectRatio: isSm ? 1 : 2.5,
                backgroundColor: theme.colors.elevation.level1,
                borderRadius: 12,
              },
            ]}
          >
            <TouchableRipple
              onPress={() => router.push('/browse')}
              style={{
                flex: 1,
                width: '100%',
                borderRadius: 12,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}
            >
              <View pointerEvents="none" style={{ alignItems: 'center' }}>
                <Text
                  variant="titleLarge"
                  style={{ color: theme.colors.onSurface }}
                >
                  課程
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  課程查詢
                </Text>
              </View>
            </TouchableRipple>
          </Surface>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: PADDING,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  item: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
