import React from 'react';
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import { FormState } from './';

type Props = {
    control: Control<FormState>;
    errors: DeepMap<FormState, FieldError>;
}

const PriceField = ({ control, errors }: Props) => (
    <Controller 
        name="price"
        rules={{required: "Campo obrigatório"}}
        control={control}
        render={(({ value, onChange }) => (
            <CurrencyInput 
                placeholder="Preço"
                className={`form-control input-base ${errors.price && 'is-invalid'}`}
                value={value}
                decimalScale={2}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                onValueChange={onChange}
                />
        ))}
        />
);

export default PriceField;