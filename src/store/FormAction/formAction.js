import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_SELECT_STUDENT,
  UPDATE_STUDENT,
} from "../formType/formType";

export const addStudentAction = (payload) => {
  return {
    type: ADD_STUDENT,
    payload,
  };
};

export const updateStudentAction = (payload) => {
  return {
    type: UPDATE_STUDENT,
    payload,
  };
};
export const deleteStudentAction = (payload) => {
  return {
    type: DELETE_STUDENT,
    payload,
  };
};
export const setStudentAction = (payload) => {
  return {
    type: SET_SELECT_STUDENT,
    payload,
  };
};

