import React from 'react';
import './styles.scss';

const Navbar = () => (
    <nav className="admin-nav-container">
        <ul>
            <li>
                <a href="link">Meus Produtos</a>
            </li>
            <li>
                <a href="link">Minhas Categorias</a>
            </li>
            <li>
                <a href="link">Meus Usuários</a>
            </li>
        </ul>
    </nav>
);

export default Navbar;