import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "yet-another-react-lightbox/styles.css";
import "./index.css";

//UI Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/paper-kit.css";

import App from "./App.tsx";

// const API_DOMAIN = "http://localhost:8788";
//const API_DOMAIN = "";
const API_DOMAIN = "https://nauticocaribe.com";
const client = new ApolloClient({
  uri: `${API_DOMAIN}/api/graphql`,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
