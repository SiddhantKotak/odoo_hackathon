import { createContext, useState } from "react";

type User = {
  name: string;
  email: string;
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
  id: string;
  title: string;
  type: string;
  description: string;
  quantity: Number;
  availibility: boolean;
  availableFrom?: Date;
  image?: string;
  price: Number;
};

type Booked = {
  id: string;
  title: string;
  type: string;
  description: string;
  availableTill: Date;
  quantity: Number;
  price: Number;
};

export interface Context {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  logUser: User;
  setLogUser: React.Dispatch<React.SetStateAction<User>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  rented: Rented;
  setRented: React.Dispatch<React.SetStateAction<Rented>>;
  booked: Booked;
  setBooked: React.Dispatch<React.SetStateAction<Booked>>;
}

export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [logUser, setLogUser] = useState<User>({
    name: "",
    email: "",
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
  const [rented, setRented] = useState<Rented>({
    id: "",
    title: "",
    type: "",
    description: "",
    quantity: 0,
    availibility: true,
    price: 0,
  });

  const [booked, setBooked] = useState<Booked>({
    id: "",
    title: "",
    type: "",
    description: "",
    availableTill: new Date(),
    quantity: 0,
    price: 0,
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
        logUser,
        setLogUser,
        profile,
        setProfile,
        rented,
        setRented,
        booked,
        setBooked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
