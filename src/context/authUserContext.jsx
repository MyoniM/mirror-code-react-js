import { createContext } from "react";

export const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  signOut: Function,
});
