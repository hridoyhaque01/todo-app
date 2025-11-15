// interface for Input component props
interface IFInputProps {
  label?: string;
  labelClass?: string;
  wrapper?: string;
  className?: string;
  type?: string;
  icon?: React.ReactNode;
  labelChildren?: React.ReactNode;
  errorMessage?: string;
  [key: string]: any;
}

// interface for Login form state
interface ILoginState {
  email: string;
  password: string;
  remember: boolean;
}

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

export type { IFInputProps, ILoginState,IUser };
