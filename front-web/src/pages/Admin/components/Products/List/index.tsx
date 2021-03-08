import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import ProductCardLoader from '../../Loaders/ProductCardLoader';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';

const List = () => {
    const [activePage, setActivePage] = useState(0);
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
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
    
    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Tem certeza que deseja remover o produto ?');

        if (confirm) {
            makePrivateRequest({url: `/products/${productId}`, method: 'DELETE'})
                .then((response => {
                    toast('Produto removido com sucesso !');
                    getProducts();
                }))
                .catch(error => {
                    toast.error('Erro ao remover o produto !');
                });
        }
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-list-container">
                {isLoading ? <ProductCardLoader /> : (
                        productsResponse?.content.map(product => (
                                <Card key={product.id} onRemove={onRemove} product={product} />
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