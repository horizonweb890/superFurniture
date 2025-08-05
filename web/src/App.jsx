import Footer from "./common/Footer"
import Navbar from "./common/Navbar"
import HomePage from "./view/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductPage from "./view/product/Product"
import ProductDetailPage from './view/product/ProductDetails';
import AboutFurnitureCompany from "./view/AboutCompany/About"
import ContactPage from "./view/Contact"

// export const request = "http://localhost:8080";
// export const request = "http://successitworld.com/sub"
export const request = "https://www.horizoncart.com"

function App() {

  return (
    <>
<BrowserRouter>
    <Navbar />
         <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/products" element={<ProductPage />} />
         <Route path="/products/:id" element={<ProductDetailPage />} />
         <Route path="/about" element={<AboutFurnitureCompany />}/>
         <Route path="/contact" element={<ContactPage />}/>
         </Routes>
    <Footer />
</BrowserRouter>

    </>
  )
}

export default App
