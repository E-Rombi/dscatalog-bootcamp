import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/Catalog/components/ProductDetails';
import Home from './pages/Home';

const Routes = () => (

    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Catalog} />
            <Route path="/products/:productId" component={ProductDetails} />
            <Route path="/admin" component={Admin} />
        </Switch>
    </BrowserRouter>
)

export default Routes;