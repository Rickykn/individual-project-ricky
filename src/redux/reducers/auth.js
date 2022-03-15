import auth_types from "../types/auth";

const init_state = {
  id: 0,
  username: "",
};

const auth_reducer = (state = init_state, action) => {
  if (action.type === auth_types.LOGIN_USER) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
    };
  } else if (action.type === auth_types.LOGOUT_USER) {
    return init_state;
  }

  return state;
};

export default auth_reducer;
