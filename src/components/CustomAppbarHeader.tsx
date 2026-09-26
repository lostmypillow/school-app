import { Appbar } from 'react-native-paper';
import { useRouter, useSegments } from 'expo-router';
import { Platform } from 'react-native';
import FilterResponsive from '@/components/filter/FilterResponsive';

export function CustomAppbarHeader({ title }: { title: string }) {
  const router = useRouter();
  const segments = useSegments();
  const isRoot = segments.length === 0;
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };
  return (
    <Appbar.Header elevated>
      {!isRoot ? <Appbar.BackAction onPress={handleBack} /> : null}

      <Appbar.Content
        title={title}
        titleStyle={{
          fontWeight: '700',
          fontFamily: Platform.select({
            web: 'system-ui, -apple-system, sans-serif',
            ios: 'System',
            android: 'sans-serif',
            default: undefined,
          }),
        }}
      />

      {title.includes('上課時間表') ? <FilterResponsive /> : null}
    </Appbar.Header>
  );
}
