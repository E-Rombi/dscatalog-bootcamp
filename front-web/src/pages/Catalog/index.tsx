import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(resp => resp.json())
            .then(resp => console.log(resp));

    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de Produtos</h1>
            <div className="catalog-products">
                <Link to="/products/1"><ProductCard /></Link>
            </div>
        </div>
    );
}

export default Catalog;