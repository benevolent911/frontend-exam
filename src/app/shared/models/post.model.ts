export class Post {
  id: number;
  title: string;
  body: string;
  name: string;
  created_at: string;
  updated_at: string;

  constructor() {
    this.id = null;
    this.name = '';
    this.title = '';
    this.created_at = '';
    this.updated_at = '';
  }
}
