import {
  ADD_USER_DATA,
  EDIT_USER_DATA,
  DELETE_USER_DATA,
} from "../constant/user";

const initState = {
  userData: [],
};

export const addUserDetails = (state = initState, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case EDIT_USER_DATA:
      return {
        ...state,
        userData: state.userData.map((data) =>
          data.id === action.payload.id ? action.payload : data
        ),
      };
    case DELETE_USER_DATA:
      return {
        ...state,
        userData: [
          ...state.userData.filter((data) => data.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
