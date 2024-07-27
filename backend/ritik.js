const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.get('/api/products', async (req, res) => {
    const { companyname, categoryname, top, minPrice, maxPrice } = req.query;
    
    try {
        const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000', {
            params: {
                top,
                minPrice,
                maxPrice
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(port, () => {
    console.log("port",port);
});