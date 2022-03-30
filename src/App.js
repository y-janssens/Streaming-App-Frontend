import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./context/Context";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Confirm from "./pages/Confirm";

function App() {
  return (
    <Provider>
      <Router>
        <Background />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/videos/:id" element={<Video />} />
          <Route path="/:item" element={<Category />} />

          <Route path="/confirm" element={<PrivateRoute />}>
            <Route path="/confirm/:item/:id" element={<Confirm />} />
          </Route>

          <Route path="/account" element={<PrivateRoute />}>
            <Route path="/account" element={<Profile />} />
          </Route>
        </Routes>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
