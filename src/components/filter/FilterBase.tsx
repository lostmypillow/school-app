import { Divider, MD3Theme, Surface, useTheme } from 'react-native-paper';
import { StyleSheet, useWindowDimensions } from 'react-native';
import FilterDropdown from '@/components/filter/FilterDropdown';
import { useCourseFilter } from '@/store';
import { useEffect } from 'react';
import { SemesterItem } from '@/schema/semesterItem';
import { DepartmentItem } from '@/schema/departmentItem';
import { DepartmentYearItem } from '@/schema/departmentYearItem';
import { CourseFilterState } from '@/schema/courseFilterState';

export function FilterBase() {
  const theme: MD3Theme = useTheme();
  const { width } = useWindowDimensions();
  const departmentData: DepartmentItem[] = useCourseFilter(
    (state) => state.departmentData
  );
  const departmentYearData: DepartmentYearItem[] = useCourseFilter(
    (state: CourseFilterState) => state.departmentYearData
  );
  const semesterYearData: SemesterItem[] = useCourseFilter(
    (state) => state.semesterYearData
  );
  const loadSemesterYearData: () => Promise<void> = useCourseFilter(
    (state: CourseFilterState): (() => Promise<void>) =>
      state.loadSemesterYearData
  );
  const fetchDepartments: () => Promise<void> = useCourseFilter(
    (state: CourseFilterState): (() => Promise<void>) => state.fetchDepartments
  );

  useEffect(() => {
    (async () => {
      await loadSemesterYearData();
      await fetchDepartments();
    })();
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
      <FilterDropdown label="學期:" data={semesterYearData} />
      <Divider />
      {/*@ts-ignore*/}
      <FilterDropdown label="系所:" data={departmentData} />
      <Divider />
      <FilterDropdown label="年級:" data={departmentYearData} />
    </Surface>
  );
}
