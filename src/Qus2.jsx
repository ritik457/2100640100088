import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/productstop=10&minPrice=1&maxPrice=10000', {
                    params: {
                        companyname: 'AMZ',
                        categoryname: 'Laptop',
                        top: 10,
                        minPrice: 1,
                        maxPrice: 10000
                    }
                });
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Top 10 Laptops</h1>
            {error && <p>{error}</p>}
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <h2>{product.productName}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Discount: {product.discount}%</p>
                        <p>Availability: {product.availability}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;