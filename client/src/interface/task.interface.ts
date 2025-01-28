export interface FormInput {
  title: string;
  description: string;
  deadline: string;
  status?: string;
  _id?: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}
