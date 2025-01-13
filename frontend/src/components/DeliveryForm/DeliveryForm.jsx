import React from 'react';
import style from './DeliveryForm.module.css';

const DeliveryForm = () => {
    return (
        <div>
            <div className={style.deliveryContainer}>
                <h2>Delivery details: </h2>
                <h4 className={style.title}>Address: </h4>
                <input type="text" className={style.addressInput} placeholder='Street and number, P.O. box.' required />
                <input type="text" className={style.addressInput} placeholder='Apartment, suite, unit, building, floor, etc. (Optional)' />
                <h4>Postcode: </h4>
                <input type="text" className={style.addressInput} placeholder='Postcode in format XX-XXX, e.g. 12-345' required />
                <h4>City: </h4>
                <input type="text" className={style.addressInput} placeholder='Enter' required />
                <h4>Phone number: </h4>
                <input type="text" className={style.addressInput} placeholder='Enter your phone number, may be used in delivery process' required />


            </div>
        </div>
    );
};

export default DeliveryForm;