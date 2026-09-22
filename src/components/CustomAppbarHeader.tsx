import { useRoute, useRouter, useSegments } from 'expo-router';
import { Appbar, useTheme } from 'react-native-paper';
import FilterResponsive from './filter/FilterResponsive';
import { useWindowDimensions } from 'react-native';
import { FilterBase } from '@/components/filter/FilterBase';

export function CustomAppbarHeader({ title }: { title: string }) {
  const router = useRouter();
  const segments = useSegments();
  const route = useRoute();
  const isRoot = segments.length === 0;
  const canGoBack = router.canGoBack();
  // Standard mobile breakpoint: width under 768px
  const isMobile = width < 768;
  return (
    <Appbar.Header elevated>
      {/* 1. Back button: automatically renders when there's a previous screen */}
      {canGoBack && !isRoot ? (
        <Appbar.BackAction onPress={() => router.back()} />
      ) : null}
      {/* 2. Title: inherits Paper's Material 3 typography & theme colors */}
      <Appbar.Content title={title} titleStyle={{ fontWeight: '700' }} />
      {/* 3. Action items on the right side */}
      {title == 'Courses' ? <FilterResponsive /> : null}
    </Appbar.Header>
  );
}
