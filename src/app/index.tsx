import {
  View,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Text,
  Surface,
  TouchableRipple,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CustomAppbarHeader } from '@/components/CustomAppbarHeader';
import { ScrollView } from 'react-native';
import React from 'react';

const COLUMNS = 3;
const GAP = 12;
const PADDING = 18;

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  // Initialize dimensions BEFORE using screenWidth
  const { width: screenWidth } = useWindowDimensions();
  const isSm = screenWidth >= 600;

  const itemWidth = (
    isSm ? `${Math.floor(100 / COLUMNS - 2)}%` : '100%'
  ) as `${number}%`;

  return (
    // Explicit flex: 1 View container instead of <> prevents Safari collapse
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.background,
      }}
    >
      <CustomAppbarHeader title="Demo 大學" />
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: theme.colors.background,
        }}
        contentContainerStyle={[styles.container, { flexGrow: 1 }]}
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
    </View>
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
