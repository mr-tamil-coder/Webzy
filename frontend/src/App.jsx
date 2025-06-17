import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import routes from "./routes";
import { MessageProvider } from "./context/MsgContext";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function App() {
  const googleClientId = import.meta.env.VITE_CLIENT_ID;
  const payPalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const router = createBrowserRouter(routes);
  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        {/* <PayPalScriptProvider options={{ clientId: payPalClientId }}> */}
          <UserProvider>
            <MessageProvider>
              <RouterProvider router={router} />
              <ToastContainer />
            </MessageProvider>
          </UserProvider>
        {/* </PayPalScriptProvider> */}
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
