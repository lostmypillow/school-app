import { CourseList } from '@/components/CourseList';
import { CustomAppbarHeader } from '@/components/CustomAppbarHeader';
import { useCourseFilter } from '@/store';
export default function Browse() {
  const departmentYearName = useCourseFilter(
    (state) => state.departmentYearName
  );
  return (
    <>
      <CustomAppbarHeader
        title={
          departmentYearName ? `${departmentYearName} 上課時間表` : '上課時間表'
        }
      />

      <CourseList />
    </>
  );
}
