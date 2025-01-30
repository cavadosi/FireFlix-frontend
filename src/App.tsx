import Layout from "./components/core/Layout";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "@/routes/Home";
import Movies from "@/routes/Movies";
import Tv from "@/routes/Tv";
import Account from "@/routes/Account";
import Error from "@/routes/Error";
import Discover from "@/routes/Discover";

import { ThemeProvider } from "@/components/core/ThemeProvider";

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(apiBaseUrl);

  return (
    <>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/discover" element={<Discover />}></Route>
          <Route path="/error" element={<Error />}></Route>
        </Routes>
      </Layout>
    </ThemeProvider>
    </>
  );
}

export default App;
