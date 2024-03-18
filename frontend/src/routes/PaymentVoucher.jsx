import React from 'react';
import { useParams } from 'react-router-dom';
import './PaymentVoucher.css';

const PaymentVoucher = () => {
    const { imageName } = useParams();

    const handleClose = () => {
        window.close(); // Fecha a página atual
    };

    return (
        <div className='containerVoucher'>
            <h2>Comprovante de pagamento</h2>
            <div className="imageVoucher">
                <img src={`http://localhost:3000/images/${imageName}`} alt="Comprovante de pagamento" />
            </div>
            <div className="closeButton">
                <button onClick={handleClose} className="button">Fechar</button>
            </div>
        </div>
    );
};

export default PaymentVoucher;
