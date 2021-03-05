import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCardLoader from 'pages/Catalog/components/Loaders/ProductCardLoader';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';

const List = () => {
    const [activePage, setActivePage] = useState(0);
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }

        setIsLoading(true);

        makeRequest({ url: '/products', params })
            .then(resp => setProductsResponse(resp.data))
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false);
            });

    }, [activePage]);
    
    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-list-container">
                {isLoading ? <ProductCardLoader /> : (
                        productsResponse?.content.map(product => (
                                <Card key={product.id} product={product} />
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

export default List;