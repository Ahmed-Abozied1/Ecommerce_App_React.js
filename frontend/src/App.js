import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavBar from "../src/components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import CartScreen from "./Pages/CartScreen/CartScreen";
import Footer from "../src/components/Footer/Footer"
import SigninScreen from "./Pages/SignIn/SigninScreen";
import Register from "./Pages/Register/RegisterScreen";
import ShippingAdreesScreen from "./Pages/ShippingAdreesScreen/ShippingAdreesScreen";
import PaymentScreen from "./Pages/PaymentScreen/PaymentScreen.jsx";
function App() {
  return (

    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <NavBar />
      <main>
     
        <Container>
          <Routes>
          <Route  path="/" element={<Home/>} exact/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/cart/:id?" element={<CartScreen/>}/>
          <Route path="/signin" element={<SigninScreen/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/shipping" element={<ShippingAdreesScreen/>}/>
          <Route path="/payment" element={<PaymentScreen/>}/>
         <Route path="*" element={<h1 style={{marginTop:"200px"}}>Page Not Found</h1>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
   
  );
}

export default App;
/*
<div className="App">
      {
        data.products.map((product,index)=>(
          <ProductCard key={index} product={product}></ProductCard>
        ))
      }
    </div> 
*/