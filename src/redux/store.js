import { createStore } from "redux";
import { addUserDetails } from "./reducer/user";

export const store = createStore(addUserDetails);
