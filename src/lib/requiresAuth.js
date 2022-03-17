const requiresAuth = (gssp) => {
  return async (context) => {
    const savedDataUser = context.req.cookies.user_data;

    if (!savedDataUser) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    return gssp(context);
  };
};

export default requiresAuth;
