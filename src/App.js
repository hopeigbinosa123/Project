import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import Home from '../src/Pages/Home';
import ProductList from '../src/Pages/ProductsList';
import ProductDetail from '../src/Pages/ProductsDetail';
import Login from '../src/Pages/Login';
import Register from '../src/Pages/Register';
import UserProfile from '../src/Pages/UserProfile';
import SellProduct from '../src/Pages/SellProduct';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser ] = useState({ name: "John Doe" });
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateUser  = (newUser ) => {
    setUser (newUser );
  };

  return (
    <Router>
      <div className="App">
        <Navbar products={products} />
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<ProductList products={products} />} />
          <Route path="/products/:id" element={<ProductDetail products={products} />} />
          <Route path="/login" element={<Login updateUser ={updateUser } />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile user={user} purchaseHistory={purchaseHistory} />} />
          <Route path="/sell-product" element={<SellProduct setPurchaseHistory={setPurchaseHistory} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;