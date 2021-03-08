import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';

type FormState = {
    name: string;
}

type ParamsType = {
    categoryId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const { categoryId } = useParams<ParamsType>();
    const history = useHistory();
    const isEditing = categoryId !== 'create';
    const formTitle = isEditing ? 'EDITAR CATEGORIA' : 'CADASTRAR CATEGORIA';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
            .then(response => {
                setValue('name', response.data.name);
            });
        }
        
    }, [categoryId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
    makePrivateRequest({url: isEditing ? `/categories/${categoryId}` : '/categories', method: isEditing ? 'PUT' : 'POST', data})
        .then(response => {
                toast('Categoria cadastrada com sucesso !');
                history.push('/admin/categories');
            })
        .catch(error => toast.error('Ocorreu um erro ao salvar a categoria !'));
    }

    return(
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-12">
                        <input 
                            ref={register({required: 'Campo obrigatório'})}
                            name="name"
                            type="text" 
                            className={`form-control input-base ${errors.name && 'is-invalid'}`}
                            placeholder="Nome da Categoria"
                        />
                        {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form