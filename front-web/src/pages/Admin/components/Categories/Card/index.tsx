import { Category } from 'core/types/Product';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    category: Category;
    onRemove: (categoryId: number) => void; 
}

const Card = ({ category,onRemove }: Props) => {
    return(
        <div className="card-base category-card">
            <div className="row ">
                <div className="col-6 d-flex align-items-center">
                    <h3 className="category-name">{category.name}</h3>
                </div>
                <div className="col-6 category-card-actions"> 
                    <div>
                        <Link to={`/admin/categories/${category.id}`} className="btn btn-outline-secondary border-radius-10 btn-action">EDITAR</Link>
                    </div>
                    <div>
                        <button className="btn btn-outline-danger border-radius-10 btn-action" onClick={() => onRemove(category.id)}>EXCLUIR</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;