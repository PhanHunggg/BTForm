import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_SELECT_STUDENT,
  UPDATE_STUDENT,
} from "../formType/formType";

const DEFAULT_STATE = {
  userList: [
    {
      maSV: 21041,
      fullName: "Phan Quoc Hung",
      phoneNumber: "0797720574",
      email: "hung@gmail.com",
    },
    {
      maSV: 21042,
      fullName: "Cao Thanh Dat",
      phoneNumber: "0967348523",
      email: "dat@gmail.com",
    },
  ],
  selectedUsers: null,
};

export const formReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_STUDENT:
      {
        const data = [...state.userList];

        const idx = data.findIndex((ele) => ele.maSV === payload.maSV);

        if (idx !== -1) return;

        data.push(payload);
        state.userList = data;
        state.selectedUsers = null;
      }

      break;

    case SET_SELECT_STUDENT:
      state.selectedUsers = payload;
      break;

    case UPDATE_STUDENT:
      {
        const data = [...state.userList];

        const idx = data.findIndex((ele) => ele.maSV === payload.maSV);

        data[idx] = payload;

        state.userList = data;
      }
      break;
    case DELETE_STUDENT:
      {
        const data = [...state.userList];

        const idx = data.findIndex((ele) => ele.maSV === payload.maSV);

        data.splice(idx, 1);
        state.userList = data;
      }
      break;
    default:
      break;
  }

  return { ...state };
};
