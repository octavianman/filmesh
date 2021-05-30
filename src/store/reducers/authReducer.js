import { GET_USER } from "../actions/types";

const INITIAL_STATE = {
  user: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...state, user: action.payload };
    }

    default:
      return state;
  }
};

export default authReducer;
