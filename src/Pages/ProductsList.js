/**
 * The ProductList component in React filters and displays a list of products based on a search input
 * for product names.
 * @returns The `ProductList` component is being returned. It consists of a search input field for
 * filtering products by name and a list of `ProductCard` components based on the filtered products.
 */

import React, {useState} from 'react';
import ProductCard from '../Components/ProductsCard';
import '../styles/ProductList.css';

const ProductList = ({ products }) => {
    const [filter, setFilter] = useState('');
    
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(filter.toLowerCase())
        );
        
    return (
        <div className="product-list">
            <input type="text" placeholder="Search by product name..." value={filter} onChange={handleFilterChange} />
            <div className="product-cards">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductList;