import Layout from "./components/core/Layout";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "@/routes/Home";
import Movies from "@/routes/Movies";
import Tv from "@/routes/Tv";
import Account from "@/routes/Account";
import Error from "@/routes/Error";
import Discover from "@/routes/Discover";
import MediaDetails from "@/routes/MediaDetails";
import MediaListView from "./routes/MediaListView";

import { UserProvider } from "@/components/core/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movies" element={<Movies />}></Route>
              <Route path="/movies/:query" element={<Movies />}></Route>
              <Route path="/tv" element={<Tv />}></Route>
              <Route path="/tv/:query" element={<Tv />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/discover" element={<Discover />}></Route>
              <Route path="/:mediaType/:id/details" element={<MediaDetails />}></Route>
              <Route path="/lists/:listKey" element={<MediaListView />} />
              <Route path="*" element={<Error />}></Route>
            </Routes>
          </Layout>
      </UserProvider>
    </>
  );
}

export default App;
