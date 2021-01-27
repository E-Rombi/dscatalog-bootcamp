import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from '../../core/types/Product';
import { makeRequest } from '../../core/utils/request';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();

    useEffect(() => {
        const params = {
            page:0,
            linesPerPage: 30
        }

        makeRequest({ url: '/products', params })
            .then(resp => setProductsResponse(resp.data))
            .catch(error => console.log(error));

    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de Produtos</h1>
            <div className="catalog-products">
                {
                    productsResponse?.content.map( product => (
                        <Link key={product.id} to={`/products/${product.id}`}>
                            <ProductCard product={product}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Catalog;