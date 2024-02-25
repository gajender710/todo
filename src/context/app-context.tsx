import { Todo } from "@/models/todo-model";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  allTodos: { [key: number]: Todo[] };
  setAllTodos: React.Dispatch<React.SetStateAction<{ [key: number]: Todo[] }>>;
  breakCount: number;
  setBreakCount: React.Dispatch<React.SetStateAction<number>>;
}

interface User {
  id: number;
  name: string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allTodos, setAllTodos] = useState<{ [key: number]: Todo[] }>({});
  const [breakCount, setBreakCount] = useState(0);

  const contextValue: AppContextProps = {
    selectedUser,
    setSelectedUser,
    allTodos,
    setAllTodos,
    breakCount,
    setBreakCount,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
