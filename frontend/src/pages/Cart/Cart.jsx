import { React, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import style from './Cart.module.css';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";




const Cart = () => {
    const [shopping, setShopping] = useState(false);
    const handleShopping = () => setShopping(true);

    return (
        <div>
            <Navbar />
            <div className={style.wholeContainer}>
                <div className={style.cartContainer}>
                    <h1>Items in your cart: </h1>
                </div>
                <div className={style.test}>
                    <DeliveryForm className={style.deliveryForm} />
                    <div className={style.cartSummary}>
                        <h2>ORDER SUMMARY: </h2>
                        <ul>
                            <li>Total items cost: </li>
                            <li>Delivery cost: </li>
                            <li>Total cost for order: </li>
                        </ul>
                        <Link to="/success">
                            <button className={style.orderNow} onClick={handleShopping}><FontAwesomeIcon icon={faCartShopping} className={style.cartIcon} /> ORDER NOW </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;