import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "yet-another-react-lightbox/styles.css";
import "./index.css";

import App from "./App.tsx";

const API_DOMAIN = "http://localhost:8788";
// const API_DOMAIN = "https://develop.nautico.fennex.dev";
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
