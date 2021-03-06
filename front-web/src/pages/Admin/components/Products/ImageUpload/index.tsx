import React, { useState } from 'react';
import './styles.scss';
import {ReactComponent as ImagePlaceHolder} from 'core/assets/images/upload-placeholder.svg';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

const ImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);


    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        setUploadProgress(progress);
    }

    const uploadImage = (selectedImage: File) => {
        const payload = new FormData();
        payload.append('file', selectedImage);

        makePrivateRequest({
            url: '/products/image', 
            method: 'POST',
            data: payload,
            onUploadProgress
        })
            .then(response => {
                toast('Imagem enviada !')
            })
            .catch(error => {
                toast.error('Ocorreu um erro ao enviar imagem !')
            })
            .finally(() => setUploadProgress(0));
    } 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];

        if (selectedImage) {
            uploadImage(selectedImage);
        }
    }


    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input type="file" accept="image/png, image/jpg" id="upload" onChange={handleChange} hidden/>
                    <label htmlFor="upload" className="">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    A imagem deve ser  JPG ou PNG e não deve ultrapassar <strong>5 MB</strong>.
                </small>
            </div>
            <div className="col-6 text-center upload-placeholder">
                <ImagePlaceHolder />
                <div className="upload-progress-container">
                    <div 
                        className="upload-progress" 
                        style={{width: `${uploadProgress}%`}}>
                        
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ImageUpload;