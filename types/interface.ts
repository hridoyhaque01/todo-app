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

// interface for Drag and Drop hook options and return types
interface IUseDragAndDropOptions<T> {
  items: T[];
  onItemsChange: (items: T[]) => void;
}

// interface for Drag and Drop hook return types
interface IUseDragAndDropReturn {
  dragOverIndex: number | null;
  draggedIndex: number | null;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
}

interface IStatus {
  isLoading: boolean;
  isError: boolean;
  error: string | null | any;
}

export type {
  IFInputProps,
  ILoginState,
  IStatus,
  IUseDragAndDropOptions,
  IUseDragAndDropReturn,
};
