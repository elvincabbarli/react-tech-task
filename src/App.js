import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./pages/Main";
import Form from "./pages/musteriLogin";
import AllSteps from "./pages/AllSteps";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/musteri-login" element={<Form />} />
        <Route path="/credit" element={<AllSteps />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
