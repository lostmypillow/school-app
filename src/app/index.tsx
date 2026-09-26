// src/app/index.tsx
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CustomAppbarHeader } from '@/components/CustomAppbarHeader';
import { Surface, TouchableRipple } from 'react-native-paper';

import { ScrollView } from 'react-native';
import React from 'react';
const COLUMNS = 3;
const GAP = 12;
const PADDING = 18;
export default function Index() {
  const theme = useTheme();
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = React.useState(0);
  const { width } = useWindowDimensions();

  // "sm" breakpoint equivalent (e.g., screen width >= 600px)
  const isSm = width >= 600;
  const itemWidth =
    containerWidth > 0 && isSm
      ? Math.floor((containerWidth - GAP * (COLUMNS - 1)) / COLUMNS)
      : '100%';

  // Derive height proportional to device screen height (e.g., ~15% of screen height) or an aspect ratio
  const itemHeight = screenHeight * 0.33;

  const items = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    // <View style={styles.container}>
    //     //   {/* 1. Paper Appbar at the top */}
    //     //   <CustomAppbarHeader title="Overview" />
    //     //
    //     //   {/* 2. Main Page Content */}
    //     //   <View style={[styles.content, { width: itemWidth, height: itemHeight }]}>
    //     //     <Card onPress={() => router.push('/browse')}>
    //     //       <Card.Title
    //     //         title={'Courses'}
    //     //         subtitle={'Search for all courses'}
    //     //       ></Card.Title>
    //     //     </Card>
    //     //   </View>
    //     // </View>
    <>
      <CustomAppbarHeader title="Demo 大學" />
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={styles.container}
      >
        <View
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          style={styles.grid}
        >
          {/* 1. Surface replaces Card. It provides the exact same shadow and background. */}
          <Surface
            elevation={1}
            style={[
              styles.item,
              {
                width: itemWidth,
                height: itemHeight,
                borderRadius: 12, // Standard React Native Paper Card curve
                overflow: 'hidden',
              },
            ]}
          >
            {/* 2. TouchableRipple sits directly inside and is forced to fill 100% of the space */}
            <TouchableRipple
              onPress={() => router.push('/browse')}
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                padding: 16, // This mimics standard <Card.Content> padding
                justifyContent: 'center',
              }}
            >
              {/* 3. A standard View replaces Card.Content so layout isn't blocked */}
              <View pointerEvents="none">
                <Text variant="titleLarge">課程</Text>
                <Text variant="bodyMedium">課程查詢</Text>
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
