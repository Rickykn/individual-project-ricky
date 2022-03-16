import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import rootReducer from "../redux/store";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AuthProvider from "../components/AuthProvider";

const store = createStore(rootReducer);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
