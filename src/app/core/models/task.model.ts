export interface TaskRequest {
  title: string;
  description: string;
  category: string;
  tags?: string;
  priority?: number;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  tags?: string;
  priority: number;
}
