import React, { useEffect, useState } from 'react';
import './styles.scss';
import {ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import Select from 'react-select';
import { Category } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

type Props = {
    name?: string;
    category?: Category;
    handleChangeName: (value: string) => void;
    handleChangeCategory: (category: Category) => void;
    clearFilters: () => void;
}

const ProductFilters = ({name, category, handleChangeName, handleChangeCategory, clearFilters}: Props) => {
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({url: '/categories'})
            .then(response => setCategories(response.data.content))
            .catch(error => toast.error('Ocorreu um problema ao carregar as categories'))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    return(
        <div className="card-base product-filters-container border-radius-10">
            <div className="input-search">
                <input 
                    type="text"
                    value={name}
                    className="form-control "
                    placeholder="Pesquisar Produto"
                    onChange={(event) => handleChangeName(event?.target.value)} />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                value={category}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => option.id.toString()}
                className="filter-select-container"
                classNamePrefix="product-category-select"
                placeholder="Categoria"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    );
}

export default ProductFilters;