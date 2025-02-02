import React from "react";
import style from "./DeliveryForm.module.css";

const DeliveryForm = () => {
    return (
        <div className={style.deliveryContainer}>
            <h2 className={style.heading}>Delivery Details</h2>
            <h4 className={style.label}>Address:</h4>
            <input
                type="text"
                className={style.inputField}
                placeholder="Street and number, P.O. box."
                required
            />
            <input
                type="text"
                className={style.inputField}
                placeholder="Apartment, suite, unit, building, floor, etc. (Optional)"
            />
            <h4 className={style.label}>Postcode:</h4>
            <input
                type="text"
                className={style.inputField}
                placeholder="Postcode in format XX-XXX, e.g. 12-345"
                required
            />
            <h4 className={style.label}>City:</h4>
            <input type="text" className={style.inputField} placeholder="Enter" required />
            <h4 className={style.label}>Phone Number:</h4>
            <input
                type="text"
                className={style.inputField}
                placeholder="Enter your phone number, may be used in delivery process"
                required
            />
            <button className={style.submitButton}>Submit</button>
        </div>
    );
};

export default DeliveryForm;
