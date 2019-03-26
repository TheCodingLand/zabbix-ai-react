import * as React from "react";

let NavContext = React.createContext();

let initialState = {
  currentPage: "Critical"
};

let reducer = (state, action) => {
    console.log(action)
  switch (action.type) {
    default:
        return { ...state }
    case "nav":
      return { ...state, currentPage: action.currentPage };
  }
};

function NavContextProvider(props) {
  // [A]
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };


  // [B]
  return (
    <NavContext.Provider value={value}>{props.children}</NavContext.Provider>
  );
}

let NavContextConsumer = NavContext.Consumer;

// [C]
export { NavContext, NavContextProvider, NavContextConsumer };
