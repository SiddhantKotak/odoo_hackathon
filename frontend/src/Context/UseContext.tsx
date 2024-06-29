import { createContext, useState } from "react";

export interface Context {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        username,
        setUsername,
        dropdown,
        setDropdown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
