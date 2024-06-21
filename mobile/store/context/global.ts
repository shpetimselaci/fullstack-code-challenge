import { createContext } from "react";
import auth from "../mobx/auth";

export const GlobalContext = createContext<{ auth: typeof auth }>({ auth });
