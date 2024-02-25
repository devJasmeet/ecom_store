import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menubar from './components/Menubar';
import Products from './pages/Products';
import { ProductProvider } from './contexts/ProductContext';
import SingleItem from './pages/SingleItem';
import './styles/menubar.css';
import './styles/App.css';
import './styles/singleItem.css';
import './styles/cart.css';
import Title from "./components/Title";


function App() {
  return (
    <div>
      <ProductProvider>
      <Title />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/singleitem" element={<SingleItem />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ProductProvider>
    </div>
  );
}

export default App;
