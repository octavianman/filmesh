import { GET_USER } from "./types";

export const getUser = (payload) => {
  return {
    type: GET_USER,
    payload: payload,
  };
};
