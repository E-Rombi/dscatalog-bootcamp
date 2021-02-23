import ButtonIcon from 'core/components/ButtonIcon';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';
import { useForm } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div>
            <AuthCard title="login">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                   <input type="email" name="email" ref={register} required className="form-control input-base margin-bottom-30" placeholder="Email"/>
                   <input type="password" name="password" ref={register} required className="form-control input-base" placeholder="Senha"/>
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