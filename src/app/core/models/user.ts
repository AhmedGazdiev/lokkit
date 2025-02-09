export interface User {
  _id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  gender: 'male' | 'female';
  role: 'admin' | 'user';
}
