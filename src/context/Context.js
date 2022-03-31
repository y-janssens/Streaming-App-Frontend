import { createContext, useReducer } from "react";
import reducer from "./Reducer";

const Context = createContext();

export const Provider = ({ children }) => {
  const initialState = {
    token: {},
    videos: [],
    video: {},
    categories: [],
    category : {},
    proxy : "http://127.0.0.1:8000",
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
