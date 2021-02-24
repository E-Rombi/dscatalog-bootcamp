import ButtonIcon from 'core/components/ButtonIcon';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit} = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.push('/admin');
            })
            .catch(error => {
                setHasError(true)
            });
    }

    return (
        <div>
            <AuthCard title="login">
                {hasError && (
                    <div className="alert alert-danger mt-5">
                        Usuário ou Senha inválidos !
                    </div>
                )}
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                   <input type="email" name="username" 
                          ref={register({required: true})} 
                          className="form-control input-base margin-bottom-30" placeholder="Email"/>
                   <input type="password" name="password" 
                          ref={register({required: true})} 
                          className="form-control input-base" placeholder="Senha"/>
                   <Link to="/admin/auth/recover" className="login-link-recover">
                       Esqueci a senha ?
                   </Link>
                   <div className="login-submit">
                        <ButtonIcon text="logar"/>
                   </div>
                   <div className="text-center">
                       <span className="not-registered">Não tem Cadastro ?  </span>
                        <Link to="/admin/auth/register" className="login-link-register">CADASTRAR</Link>
                   </div>
                </form>
            </AuthCard>
        </div>
    );
}

export default Login;