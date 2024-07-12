declare global {
  type ToDo = {
    title: string;
    description: string;
    assignee: string;
    status: string;
    priority: string;
    createdDate: string;
    dueDate: string;
  };
}
