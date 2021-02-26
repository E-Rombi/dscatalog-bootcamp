import ButtonIcon from 'core/components/ButtonIcon';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {
    const { register, handleSubmit, errors} = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/admin" } };

    const onSubmit = (data: FormData) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.replace(from)
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
                    <div className="margin-bottom-30">
                        <input type="email" name="username" 
                                ref={register({
                                    required: "Campo obrigatório",
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Email inválido"
                                    }
                                  })} 
                                className={`form-control input-base ${errors.username && 'is-invalid'}`} placeholder="Email"/>
                        {errors.username && (
                            <div className="invalid-feedback d-block">
                                {errors.username.message}
                            </div>
                        )}
                    </div>
                    <div className="margin-bottom-30">
                        <input type="password" name="password" 
                            ref={register({required: "Campo obrigatório"})} 
                            className={`form-control input-base ${errors.password && 'is-invalid'}`} placeholder="Senha"/>
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
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