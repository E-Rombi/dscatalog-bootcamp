import React, { useState } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '3',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://images5.kabum.com.br/produtos/fotos/128375/placa-de-video-evga-nvidia-geforce-rtx-3090-24gb-gddr6x-24g-p5-3975-kr_1600783698_g.jpg',
            categories: [{id: formData.category}]
        }
        
        makePrivateRequest({url: '/products', method:'POST', data: payload})
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            type="text" 
                            value={formData.name}
                            name="name"
                            className="form-control my-5" 
                            onChange={handleOnChange} 
                            placeholder="Nome do Produto" 
                        />
                        <select value={formData.category} className="form-control mb-5" onChange={handleOnChange} name="category">
                            <option value="1">Livros</option>
                            <option value="2">Eletrônicos</option>
                            <option value="3">Computadores</option>
                        </select>
                        <input 
                            type="text"
                            value={formData.price} 
                            name="price"
                            className="form-control" 
                            onChange={handleOnChange} 
                            placeholder="Preço" 
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description" 
                            className="form-control my-5" 
                            cols={30} rows={8}
                            onChange={handleOnChange}></textarea>
                    </div>

                </div>
            </ BaseForm>
        </form>
    );
}

export default Form;