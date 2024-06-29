import { createContext, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type Profile = {
  username: string;
  house_no: string;
  street: string;
  city_state: string;
  area: string;
  address: string;
  phone_num: string;
};

type Rented = {
  title: string;
  type: string;
  description: string;
  quantity: Number;
  availibility: boolean;
  availableFrom?: Date;
  image?: string;
  price: Number;
};

export interface Context {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [profile, setProfile] = useState<Profile>({
    username: "",
    house_no: "",
    street: "",
    city_state: "",
    area: "",
    address: "",
    phone_num: "",
  });

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        username,
        setUsername,
        dropdown,
        setDropdown,
        user,
        setUser,
        profile,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
