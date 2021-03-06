import BaseForm from '../../BaseForm';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('description', response.data.description);
                setValue('price', response.data.price);
                setValue('imgUrl', response.data.imgUrl);
            });
        }
        
    }, [productId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({url: isEditing ? `/products/${productId}` : '/products' , method: isEditing ? 'PUT' : 'POST', data})
            .then((response => {
                toast.info('Produto salvo com sucesso !');
                console.log(response.data.id);
                history.push('/admin/products');
            }))
            .catch(error => {
                toast.error('Erro ao salvar o produto !');
            });
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({required: "Campo obrigatório",
                                               minLength: {value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                               maxLength: {value: 60, message: 'O campo deve ter no máximo 60 caracteres'}})}
                                type="text" 
                                name="name"
                                className={`form-control input-base ${errors.name && 'is-invalid'}`}   
                                placeholder="Nome do Produto" 
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                                type="text"
                                ref={register({required: "Campo obrigatório"})}
                                name="price"
                                className={`form-control input-base ${errors.price && 'is-invalid'}`}
                                placeholder="Preço" 
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                type="text" 
                                ref={register({required: "Campo obrigatório"})}
                                name="imgUrl"
                                className={`form-control input-base ${errors.imgUrl && 'is-invalid'}`}
                                placeholder="Imagem do Produto" 
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description" 
                            ref={register({required: "Campo obrigatório"})}
                            placeholder="Descrição"
                            className={`form-control input-base ${errors.description && 'is-invalid'}`}
                            cols={30} rows={10}
                        >
                            
                        </textarea>
                        {errors.description && (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div>
                            )}
                    </div>

                </div>
            </ BaseForm>
        </form>
    );
}

export default Form;