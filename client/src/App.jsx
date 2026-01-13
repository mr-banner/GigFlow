import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import PostGig from "./pages/PostGig";
import MyGigs from "./pages/MyGigs";
import GigDetails from "./pages/GigDetails";
import MyBids from "./pages/MyBids";

const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gigs" element={<Gigs />} />
            <Route path="post-gig" element={<PostGig />} />
            <Route path="my-bids" element={<MyBids />} />
            <Route path="my-gigs" element={<MyGigs />} />
            <Route path="gigs/:id" element={<GigDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
);

export default App;
