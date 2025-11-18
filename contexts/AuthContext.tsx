"use client";

import { getAuthUser, SignupInput, UpdateInput, updateProfile } from "@/lib"; // your API call
import { ILoginState, IUser } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface AuthContextType {
  // states
  user: IUser | null;
  loginState: ILoginState;
  signupState: SignupInput;
  profileState: UpdateInput;
  isUpdating: boolean;
  updateErrors: any;
  // setters and handlers
  loginDispatch: React.Dispatch<any>;
  profileDispatch: React.Dispatch<any>;
  signupDispatch: React.Dispatch<any>;
  setUser: (user: IUser | null) => void;
  refreshUser: () => Promise<void>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  HandlerUpdateProfile: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Initial states and reducers
const loginInitialState: ILoginState = {
  email: "",
  password: "",
  remember: false,
};

// Signup initial state
const signupInitialState: SignupInput = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const profileInitialState: UpdateInput = {
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  contact_number: "",
  birthday: "",
  bio: "",
  profile_image: "",
};

// Login reducer
const loginReducer = (state: ILoginState, action: any) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_REMEMBER":
      return { ...state, remember: action.payload };
    default:
      return state;
  }
};

// Signup reducer
const signupReducer = (state: SignupInput, action: any) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, first_name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, last_name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirm_password: action.payload };
    default:
      return state;
  }
};

// Profile reducer
const profileReducer = (state: UpdateInput, action: any) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, first_name: action.payload };
    case "SET_LAST_NAME":
      return { ...state, last_name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_CONTACT_NUMBER":
      return { ...state, contact_number: action.payload };
    case "SET_BIRTHDAY":
      return { ...state, birthday: action.payload };
    case "SET_BIO":
      return { ...state, bio: action.payload };
    case "SET_PROFILE_IMAGE":
      return { ...state, profile_image: action.payload };
    case "INITIATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    loginInitialState
  );
  const [signupState, signupDispatch] = useReducer(
    signupReducer,
    signupInitialState
  );
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    profileInitialState
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateErrors, setUpdateErrors] = useState<any>({});

  // Function to fetch user from API
  const refreshUser = async () => {
    try {
      const data = await getAuthUser();
      setUser(data || null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setUser(null);
    }
  };

  // handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      profileDispatch({ type: "SET_PROFILE_IMAGE", payload: imageUrl });
    }
  };

  // handler to update profile
  const HandlerUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateErrors({});

    const formData = new FormData(e.currentTarget);
    const result: any = await updateProfile(null, formData);

    setIsUpdating(false);

    if (result?.success && result?.user) {
      setUser(result.user);
      profileDispatch({ type: "INITIATE", payload: result.user });
    } else if (result?.errors) {
      setUpdateErrors(result.errors);
    }
  };

  // Fetch user once on mount
  useEffect(() => {
    const fetchUser = async () => {
      await refreshUser();
    };
    fetchUser();
  }, []);

  // Initialize profile state when user changes
  useEffect(() => {
    if (user) {
      profileDispatch({ type: "INITIATE", payload: user });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        refreshUser,
        loginState,
        loginDispatch,
        signupState,
        signupDispatch,
        profileState,
        isUpdating,
        updateErrors,
        handleImageChange,
        HandlerUpdateProfile,
        profileDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
