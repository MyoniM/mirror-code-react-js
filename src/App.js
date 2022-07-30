import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import MirrorEditor from "./pages/mirror-editor";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { AuthUserContext } from "./context/authUserContext";
import useFirebaseAuth from "./hooks/useFirebaseAuth";

function App() {
  return (
    <>
      <AuthUserContext.Provider value={useFirebaseAuth()}>
        <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/mirror-editor" element={<MirrorEditor />}></Route>
              </Routes>
            </BrowserRouter>
          </NotificationsProvider>
        </MantineProvider>
      </AuthUserContext.Provider>
    </>
  );
}

export default App;
