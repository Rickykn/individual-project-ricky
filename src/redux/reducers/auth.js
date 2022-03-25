import auth_types from "../types/auth";

const initial_state = {
  id: 0,
  username: "",
  avatar: "",
  bio: "",
  full_name: "",
};

const auth_reducer = (state = initial_state, action) => {
  if (action.type === auth_types.LOGIN_USER) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      avatar: action.payload.avatar,
      bio: action.payload.bio,
      full_name: action.payload.full_name,
    };
  } else if (action.type === auth_types.LOGOUT_USER) {
    return initial_state;
  }

  return state;
};

export default auth_reducer;
