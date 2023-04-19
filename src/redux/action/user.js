import {
  ADD_USER_DATA,
  EDIT_USER_DATA,
  DELETE_USER_DATA,
} from "../constant/user";

const addUser = (userData) => ({
  type: ADD_USER_DATA,
  payload: userData,
});

const editUser = (editedData) => ({
  type: EDIT_USER_DATA,
  payload: editedData,
});

const deleteUser = (deletedId) => ({
  type: DELETE_USER_DATA,
  payload: deletedId,
});

export { addUser, editUser, deleteUser };
