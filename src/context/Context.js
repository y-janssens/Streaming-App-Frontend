import { createContext, useReducer } from "react";
import reducer from "./Reducer";

const Context = createContext();

export const Provider = ({ children }) => {
  const initialState = {
    token: {},
    user: {},
    videos: [],
    video: {},
    categories: [],
    category : {},
    proxy : "https://y-jns-api.herokuapp.com",
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
