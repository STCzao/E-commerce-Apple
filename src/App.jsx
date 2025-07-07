import Navbar from "../src/Components/Navbar/Navbar.jsx"; 
import Hero from "../src/Components/Hero/Hero.jsx";      
import Home from "./pages/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home/>
      <Footer/>
    </div>
  );
};

export default App;