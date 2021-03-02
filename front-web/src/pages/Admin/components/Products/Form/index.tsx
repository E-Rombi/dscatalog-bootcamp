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
    const { register, handleSubmit } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({url: '/products', method:'POST', data});
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            ref={register({required: "Campo obrigatório"})}
                            type="text" 
                            name="name"
                            className="form-control input-base margin-bottom-30"  
                            placeholder="Nome do Produto" 
                        />
                        
                        <input 
                            type="number"
                            ref={register({required: "Campo obrigatório"})}
                            name="price"
                            className="form-control input-base margin-bottom-30" 
                            placeholder="Preço" 
                        />

                        <input
                            type="text" 
                            ref={register({required: "Campo obrigatório"})}
                            name="imageUrl"
                            className="form-control input-base margin-bottom-30" 
                            placeholder="Imagem do Produto" 
                        />

                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description" 
                            ref={register({required: "Campo obrigatório"})}
                            placeholder="Descrição"
                            className="form-control input-base" 
                            cols={30} rows={10}
                        >
                            
                        </textarea>
                    </div>

                </div>
            </ BaseForm>
        </form>
    );
}

export default Form;