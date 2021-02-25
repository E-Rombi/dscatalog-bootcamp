import Auth from 'pages/Auth';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/Catalog/components/ProductDetails';
import Home from './pages/Home';
import history from './core/utils/history';
import PrivateRoute from 'core/components/Routes/PrivateRoute';

const Routes = () => (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/products" exact component={Catalog} />
            
            <Route path="/products/:productId" component={ProductDetails} />

            <Route path="/admin/auth" component={Auth} />

            <Redirect from="/admin" to="/admin/products"  exact />

            <PrivateRoute path="/admin">
                <Admin />
            </PrivateRoute>
        </Switch>
    </Router>
)

export default Routes;