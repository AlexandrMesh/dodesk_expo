export interface ITask {
  id: string;
  title: string;
  status: string;
  description?: string;
  created_at: number;
  completed_at: number | null;
  listId: string;
  language: string;
  parentId?: string | null;
}
