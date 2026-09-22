import { Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/FrontPage/FrontPage";
import { PosterPage } from "./pages/PostersPage/PosterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/posters" element={<PosterPage />} >
        <Route path="/genres/:id" element={<PosterListModule />} />
        <Route path="/posters/:id/" element={<PosterDetailsModule />} />
      </Route>
 
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} /> 
    </Routes>
  );
}}

export default App;

 
