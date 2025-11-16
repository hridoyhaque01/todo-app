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

export type { IFInputProps, ILoginState };
