import BaseForm from '../../BaseForm';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Category } from 'core/types/Product';

type FormState = {
    name: string;
    price: string;
    description: string;
    categories: Category[];
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'EDITAR PRODUTO' : 'CADASTRAR PRODUTO';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('description', response.data.description);
                setValue('price', response.data.price);
                setValue('imgUrl', response.data.imgUrl);
                setValue('categories', response.data.categories);
            });
        }
        
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({url: '/categories'})
            .then(response => setCategories(response.data.content))
            .catch(error => toast.error('Ocorreu um problema ao carregar as categories'))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({url: isEditing ? `/products/${productId}` : '/products' , method: isEditing ? 'PUT' : 'POST', data})
            .then((response => {
                toast.info('Produto salvo com sucesso !');
                history.push('/admin/products');
            }))
            .catch(error => {
                toast.error('Erro ao salvar o produto !');
            });
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({required: "Campo obrigatório",
                                               minLength: {value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                               maxLength: {value: 60, message: 'O campo deve ter no máximo 60 caracteres'}
                                              })
                                    }
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
                            <Controller
                                    as={Select}
                                    name="categories"
                                    rules={{required: true}}
                                    control={control}
                                    isLoading={isLoadingCategories}
                                    options={categories}
                                    getOptionLabel={(option: Category) => option.name}
                                    getOptionValue={(option: Category) => option.id.toString()}
                                    className={`${errors.categories && 'is-invalid'}`}
                                    classNamePrefix="category-select"
                                    placeholder="Categoria"
                                    isMulti 
                                    />
                                    {errors.categories && (
                                        <div className="invalid-feedback d-block">
                                            Campo obrigatório
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