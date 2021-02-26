import PrivateRoute from 'core/components/Routes/PrivateRoute';
import React from 'react';
import { Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products />
                </PrivateRoute>      
                <PrivateRoute path="/admin/categories">
                    <h1>Categories</h1>
                </PrivateRoute>   
                <PrivateRoute allowedRoutes={['ROLE_ADMIN']} path="/admin/users">
                    <h1>Users</h1>
                </PrivateRoute>             
            </Switch>
        </div>
    </div>
)

export default Admin;