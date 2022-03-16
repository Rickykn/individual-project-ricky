import jsCookie from "js-cookie";
import { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import auth_types from "../../redux/types/auth";

const AuthProvider = ({ children }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedUserData = jsCookie.get("user_data");

    if (savedUserData) {
      const parseUserData = JSON.parse(savedUserData);

      dispatch({
        type: auth_types.LOGIN_USER,
        payload: parseUserData,
      });
    }

    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthProvider;