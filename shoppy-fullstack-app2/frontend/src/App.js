import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { Products } from './pages/Products.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { Cart } from './pages/Cart.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { CheckoutInfo } from './pages/CheckoutInfo.jsx';
import { Support } from './pages/Support.jsx';
import { CartProvider } from './context/CartContext.js';
import { AuthProvider } from './context/AuthContext.js';
import { ProtectedPageRoute } from './pages/ProtectedPageRoute.js';
import { ProductProvider } from './context/ProductContext.js'

import './styles/cgvSignup.css';
import "./styles/cgv.css";
import './styles/shoppy.css';
import './styles/commons.css'

export default function App() {  
  return(
    <ProductProvider>
      <AuthProvider>
        <CartProvider> {/* CartProvider안에 있는 컴포넌트들(<Products/>, <Login/> 등등)은 CartContext를 사용할 수 있다. */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home/>}></Route>
                <Route path="/all" element={<Products/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/cart" element={
                  <ProtectedPageRoute>
                    <Cart/>
                  </ProtectedPageRoute>
                  }></Route>
                <Route path="/products/:pid" element={<ProductDetail />}></Route> {/* /:pid 경로로 넘어가는 변수를 :으로 해서 변수명(pid)를 적용하여 사용 */}
                <Route path='/checkout' element={
                  <ProtectedPageRoute>
                    <CheckoutInfo/>
                  </ProtectedPageRoute>
                  }></Route>
                <Route path='/support' element={
                  <ProtectedPageRoute>
                    <Support/>
                  </ProtectedPageRoute>
                  }></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  );
}


