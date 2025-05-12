export interface Dashboard {
  user:{
    first_name: string;
    last_name: string;
  }
  stats: {
    activeClasses: number;
    totalAssignments: number;
    totalStudents: number;
  };
  recentAssignments: Assignment[];
  recentDiscussions: Discussion[];
}

export interface Assignment {
  id: string;
  classroom_name: string;
  total_marks: number;
  due_date: string;
}

export interface Discussion {
  id: string;
  title: string;
  classroom_name: string;
  author: string;
  replies: number;
}
