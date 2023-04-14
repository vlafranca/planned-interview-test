export interface UserResponse {
  data: User[];
}

export interface User {
  age: number;
  country: string;
  email: string;
  name: Name;
}

export interface Name {
  firstName: string;
  lastName: string;
}
