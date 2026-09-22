import { create } from 'zustand';

const start = new Date();
export type SemesterItem = {
  id: string;
  link: string;
  updated_at: string;
  year: string;
  sem: string;
  created_at: string;
};
export type DepartmentItem = {
  year: string;
  semester_id: string;
  code: string;
  link: string;
  created_at: string;
  id: string;
  sem: string;
  name: string;
  updated_at: string;
};
export type DepartmentYearItem = {
  id: string;
  sem: string;
  name: string;
  created_at: string;
  department_id: string;
  year: string;
  code: string;
  link: string;
  updated_at: string;
};
export interface CourseFilterState {
  semesterYear: string;
  semesterYearData: SemesterItem[];
  department: string;
  departmentData: DepartmentItem[];
  departmentYear: string;
  departmentYearData: DepartmentYearItem[];
  courseData: Course[];
  loadSemesterYearData: () => void;
  setSemesterYear: (newFilter: string) => void;
  setDepartment: (newFilter: string) => void;
  setDepartmentYear: (newFilter: string) => void;
}
export interface Course {
  id: string;
  link: string | null;
  thu: string | null;
  with_class: string | null;
  credits: number;
  fri: string | null;
  experiment: string | null;
  department_year_id: string;
  course_type: string;
  sat: string | null;
  cross_discipline: string | null;
  year: string | null;
  instructor: string | null;
  classroom: string | null;
  sun: string | null;
  students_enrolled: number;
  created_at: string;
  sem: string;
  mon: string | null;
  students_dropped: null;
  updated_at: string;
  code: string;
  tue: string | null;
  language: string | null;
  name: string;
  wed: string | null;
  notes: string | null;
}
export const useCourseFilter = create<CourseFilterState>((set, get) => ({
  semesterYear: `${start.getFullYear() - 1911}_${start.getMonth() - 6 >= 0 ? '1' : '2'}`,
  semesterYearData: [],
  department: '',
  departmentData: [],
  departmentYear: '',
  departmentYearData: [],
  courseData: [],
  loadSemesterYearData: async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/semesters`);
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
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  },
  setSemesterYear: async (newFilter: string) => {
    set({ semesterYear: newFilter });
    try {
      const response = await fetch(
        `http://localhost:8080/courses/departments?semester_id=${newFilter}`
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
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  },
  setDepartment: async (newFilter: string) => {
    set({ department: newFilter });
    try {
      const response = await fetch(
        `http://localhost:8080/courses/department_years?department_id=${newFilter}`
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
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  },
  setDepartmentYear: async (newFilter: string) => {
    set({ departmentYear: newFilter });
    try {
      const response = await fetch(
        `http://localhost:8080/courses/courses?department_year_id=${newFilter}`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      set({
        courseData: await response.json(),
      });
    } catch (error) {
      // @ts-ignore
      console.error(error.message);
    }
  },
}));
