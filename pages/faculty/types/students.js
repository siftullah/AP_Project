export interface Student {
  id: string;
  classroom_id: string;
  student_id: string;
  name: string;
  roll_number: string;
}

export interface Class {
  id: string;
  name: string;
}

export interface StudentData {
  classes: Class[];
  students: Student[];
}
