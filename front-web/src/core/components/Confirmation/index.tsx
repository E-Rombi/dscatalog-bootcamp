import React from 'react';

type Props = {
    confirm: () => void;
}



const Confirmation = ({ confirm }: Props) => {
    return (
        <div className="modal" id="ModalConfirmation">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmação</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div className="modal-body">
                    <p>Tem certeza que deseja excluir o produto ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => confirm()}>CANCELAR</button>
                    <button type="button" className="btn btn-primary">OK</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;