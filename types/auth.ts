// interface for User object
interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  profile_image: string;
  bio: string;
  [key: string]: any;
}

export type { IUser };
