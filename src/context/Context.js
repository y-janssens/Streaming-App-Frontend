import { createContext, useReducer } from "react";
import reducer from "./Reducer";

const Context = createContext();

let dev = false;
let proxy;

if (dev) {
  proxy = "http://127.0.0.1:8000"
} else {
  proxy = "https://y-jns-api.herokuapp.com"
}

export const Provider = ({ children }) => {
  const initialState = {
    token: {},
    user: {},
    videos: [],
    video: {},
    categories: [],
    category : {},
    profile: {},
    result: [],
    proxy : proxy,
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
