import ProductPrice from 'core/components/ProductPrice';
import React from 'react';
import './styles.scss';

const Card = () => {
    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/7-big.jpg" alt="img" className="product-card-image-admin" />
                </div>
                <div className="col-7 py-3">
                    <h3 className="product-card-name-admin">MacBook Pro</h3>
                    <ProductPrice price={20.5} />
                    <div>
                        <span className="badge rounded-pill bg-secondary mr-2">Secondary</span>
                        <span className="badge rounded-pill bg-secondary mr-2">Secondary</span>
                        <span className="badge rounded-pill bg-secondary mr-2">Secondary</span>
                    </div>
                </div>
                <div className="col-3 py-3 pt-3 pr-5">
                    <button type="button" className="btn btn-outline-secondary btn-edit btn-block border-radius-10 mb-3 ">EDITAR</button>
                    <button type="button" className="btn btn-outline-danger btn-block border-radius-10">EXCLUIR</button>
                </div>
            </div>
        </div>
    );
}

export default Card;