const express = require('express');
const app = express();

//My "database"
let products = [
    { id: 1, name: 'Chair', price: 100},
    { id: 2, name: 'Table', price: 200}
];

// Get all products
app.get('/api/products', (req,res) => {
    res.json(products);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));