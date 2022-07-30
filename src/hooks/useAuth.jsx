import { useContext } from "react";
// local
import { AuthUserContext } from "../context/authUserContext";

export const useAuth = () => useContext(AuthUserContext);
