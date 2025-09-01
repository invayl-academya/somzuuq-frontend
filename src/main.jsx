import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ "client-id": PAYPAL_CLIENT_ID, currency: "USD" }}
        >
          <App />
        </PayPalScriptProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
