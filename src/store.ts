import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SemesterItem } from '@/schema/semesterItem';
import { DepartmentItem } from '@/schema/departmentItem';
import { DepartmentYearItem } from '@/schema/departmentYearItem';
import { CourseFilterState } from '@/schema/courseFilterState';
const start = new Date();
const baseUrl = 'https://school-api.lostmypillow.com';
export const useCourseFilter = create<CourseFilterState>()(
  persist(
    (set, get) => ({
      semesterYear: `${start.getFullYear() - 1911}_${start.getMonth() - 6 >= 0 ? '1' : '2'}`,
      semesterYearData: [],
      department: '',
      departmentData: [],
      departmentYear: '',
      departmentYearName: '',
      departmentYearData: [],
      courseData: [],
      loadSemesterYearData: async () => {
        const response = await fetch(`${baseUrl}/courses/semesters`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        set({
          semesterYearData: (await response.json()).sort(
            (a: SemesterItem, b: SemesterItem) =>
              b.year.localeCompare(a.year, undefined, { numeric: true }) ||
              b.sem.localeCompare(a.sem, undefined, { numeric: true })
          ),
        });
      },
      setDepartmentYearName: (name: string) => {
        set({ departmentYearName: name });
      },
      setSemesterYear: async (newFilter: string) => {
        set({ semesterYear: newFilter, departmentYearData: [] });
        await get().fetchDepartments();
      },
      fetchDepartments: async () => {
        const response = await fetch(
          `${baseUrl}/courses/departments?semester_id=${get().semesterYear}`
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        set({
          departmentData: (await response.json()).sort(
            (a: DepartmentItem, b: DepartmentItem) =>
              a.code.localeCompare(b.code, undefined, { numeric: true })
          ),
        });
      },
      setDepartment: async (newFilter: string) => {
        set({ department: newFilter });
        const response = await fetch(
          `${baseUrl}/courses/department_years?department_id=${newFilter}`
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        set({
          departmentYearData: (await response.json()).sort(
            (a: DepartmentYearItem, b: DepartmentYearItem) =>
              b.code.localeCompare(a.code, undefined, { numeric: true })
          ),
        });
      },
      setDepartmentYear: async (newFilter: string) => {
        set({ departmentYear: newFilter });
        await get().fetchDepartmentYears();
      },
      fetchDepartmentYears: async () => {
        const response = await fetch(
          `${baseUrl}/courses/courses?department_year_id=${get().departmentYear}`
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        set({
          courseData: await response.json(),
        });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        semesterYear: state.semesterYear,
        department: state.department,
        departmentYear: state.departmentYear,
        departmentYearName: state.departmentYearName,
        courseData: state.courseData,
      }),
    }
  )
);
