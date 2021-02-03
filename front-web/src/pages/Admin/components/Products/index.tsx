import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Products = () => {
    return(
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <h1>Listagem de Produtos</h1>
                </Route>
                <Route path="/admin/products/create">
                    <h1>Criação de Produtos</h1>
                </Route>
                <Route path="/admin/products/:productId">
                    <h1>Edição de Produtos</h1>
                </Route>
            </Switch>
        </div>
    );
}


export default Products;