import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Card from '../Card';
import { CategoryResponse } from 'core/types/Product';
import CategoryCardLoader from '../../Loaders/CategoryCardLoader';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';

const List = () => {
    const [activePage, setActivePage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [categoriesResponse, setCategoriesResponse] = useState<CategoryResponse>();
    const history = useHistory();

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }

        setIsLoading(true);

        makeRequest({ url: '/categories', params })
            .then(resp => setCategoriesResponse(resp.data))
            .catch(error => toast.error('Ocorreu um erro ao carregar categorias !'))
            .finally(() => {
                setIsLoading(false);
            });
    }, [activePage]);

    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Tem certeza que deseja remover a categoria ?');

        if (confirm) {
            makePrivateRequest({url: `/categories/${categoryId}`, method: 'DELETE'})
                .then((response => {
                    toast('Categoria removida com sucesso !');
                    getCategories();
                }))
                .catch(error => {
                    toast.error('Erro ao remover a categoria !');
                });
        }
    }

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleCreate = () => {
        history.push('/admin/categories/create')
    }
    
    return(
        <div className="admin-categories-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>ADICIONAR</button>
            <div className="admin-list-container">
                { isLoading ? (<CategoryCardLoader />) : 
                    categoriesResponse?.content.map(category => (
                        <Card key={category.id} category={category} onRemove={onRemove} />
                    ))
                }
            </div>  
            {
                categoriesResponse && (
                    <Pagination activePage={activePage} totalPages={categoriesResponse.totalPages} onChange={page => setActivePage(page)} />
                )
            }
            
        </div>
    );
}

export default List;