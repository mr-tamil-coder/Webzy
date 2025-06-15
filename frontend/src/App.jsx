import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import routes from "./routes";
import { MessageProvider } from "./context/MsgContext";
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const router = createBrowserRouter(routes);
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <UserProvider>
          <MessageProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </MessageProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
