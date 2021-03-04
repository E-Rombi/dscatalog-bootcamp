import BaseForm from '../../BaseForm';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { makePrivateRequest } from 'core/utils/request';

type FormState = {
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({url: '/products', method:'POST', data});
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
                                type="number"
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
                                name="imageUrl"
                                className={`form-control input-base ${errors.imageUrl && 'is-invalid'}`}
                                placeholder="Imagem do Produto" 
                            />
                            {errors.imageUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imageUrl.message}
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