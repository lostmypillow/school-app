import { Divider, Surface, useTheme } from 'react-native-paper';
import { StyleSheet, useWindowDimensions } from 'react-native';
import FilterDropdown from '@/components/filter/FilterDropdown';
import { mockYearSems } from '@/components/mockYearSems';
import { mockDeps } from '@/components/mockDeps';
import { mockDepYears } from '@/components/mockDepYears';
import { useCourseFilter } from '@/store';
import { useEffect } from 'react';

export function FilterBase() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const departmentData = useCourseFilter((state) => state.departmentData);
  const departmentYearData = useCourseFilter(
    (state) => state.departmentYearData
  );
  const semesterYearData = useCourseFilter((state) => state.semesterYearData);
  const loadSemesterYearData = useCourseFilter(
    (state) => state.loadSemesterYearData
  );

  useEffect(() => {
    loadSemesterYearData();
  }, []);
  return (
    <Surface
      style={{
        borderRadius: width >= 768 ? undefined : 16,
        borderWidth: width >= 768 ? undefined : StyleSheet.hairlineWidth,
        overflow: 'hidden',
        backgroundColor: width >= 768 ? undefined : theme.colors.surfaceVariant,
        borderColor: width >= 768 ? undefined : theme.colors.outlineVariant,
        flexDirection: width >= 768 ? 'row' : 'column',
      }}
      elevation={0}
    >
      <FilterDropdown label={'學期'} data={semesterYearData} />
      <Divider />
      {/*@ts-ignore*/}
      <FilterDropdown label={'系所'} data={departmentData} />
      <Divider />
      <FilterDropdown label={'年級'} data={departmentYearData} />
    </Surface>
  );
}
