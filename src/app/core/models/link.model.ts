export interface LinkRequest {
  url: string;
  title: string;
  description?: string;
  category: string;
  tags?: string;
}

export interface LinkResponse {
  id: number;
  url: string;
  title: string;
  description?: string;
  category: string;
  tags?: string;
}
