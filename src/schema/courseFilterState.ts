import { SemesterItem } from '@/schema/semesterItem';
import { DepartmentItem } from '@/schema/departmentItem';
import { DepartmentYearItem } from '@/schema/departmentYearItem';

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

export interface CourseFilterState {
  semesterYear: string;
  semesterYearData: SemesterItem[];
  department: string;
  departmentData: DepartmentItem[];
  departmentYear: string;
  departmentYearData: DepartmentYearItem[];
  courseData: Course[];
  departmentYearName: string;
  setDepartmentYearName: (name: string) => void;
  loadSemesterYearData: () => Promise<void>;
  setSemesterYear: (newFilter: string) => Promise<void>;
  setDepartment: (newFilter: string) => Promise<void>;
  fetchDepartments: () => Promise<void>;
  setDepartmentYear: (newFilter: string) => Promise<void>;
  fetchDepartmentYears: () => Promise<void>;
}
