import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from '../../core/utils/request';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import ProductCard from './components/ProductCard';
import './styles.scss';
import Pagination from 'core/components/Pagination';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';

const Catalog = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback((filter?: FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: filter?.name,
            categoryId: filter?.categoryId
        }

        setIsLoading(true);

        makeRequest({ url: '/products', params })
            .then(resp => setProductsResponse(resp.data))
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);

    useEffect(() => {
        getProducts();

    }, [getProducts]);

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="catalog-title">Catálogo de Produtos</h1>
                <ProductFilters onSearch={filter => getProducts(filter)} />
            </div>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link key={product.id} to={`/products/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    ))

                )}

            </div>
            { productsResponse && <Pagination  
                                        totalPages={productsResponse.totalPages} 
                                        activePage={activePage}
                                        onChange={page => setActivePage(page)} />}
        </div>
    );
}

export default Catalog;