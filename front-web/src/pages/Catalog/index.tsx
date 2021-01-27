import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from '../../core/utils/request';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 30
        }

        setIsLoading(true);

        makeRequest({ url: '/products', params })
            .then(resp => setProductsResponse(resp.data))
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de Produtos</h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link key={product.id} to={`/products/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    ))

                )}

            </div>
        </div>
    );
}

export default Catalog;