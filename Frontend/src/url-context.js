import * as React from "react";

const UrlContext = React.createContext();

const INITIAL_STAGE = JSON.parse(localStorage.getItem("urls")) || [];

function UrlReducer(state, action) {
  switch (action.type) {
    case "STORE_URL": {
      return {
        ...state,
        urls: state.urls.concat([action.url]),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UrlProvider({ children }) {
  const [state, dispatch] = React.useReducer(UrlReducer, {
    urls: INITIAL_STAGE,
  });
  React.useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(state.urls));
  }, [state]);

  const value = { state, dispatch };
  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
}

function useUrls() {
  const context = React.useContext(UrlContext);
  if (context === undefined) {
    throw new Error("useUrl must be used within a UrlProvider");
  }
  return context;
}

export { UrlProvider, useUrls };
