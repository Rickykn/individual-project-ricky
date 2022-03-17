import auth_types from "../types/auth";

const initial_state = {
  id: 0,
  username: "",
  avatar: "",
};

const auth_reducer = (state = initial_state, action) => {
  if (action.type === auth_types.LOGIN_USER) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      avatar: action.payload.avatar,
    };
  } else if (action.type === auth_types.LOGOUT_USER) {
    return initial_state;
  }

  return state;
};

export default auth_reducer;
