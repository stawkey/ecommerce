import React from "react";
import api from "../../utils/api";

const get = () => {
    api.get("/orders/order-history");
};

const Profile = () => {
    return (
        <div>
            <p>Hi!</p>
            {get()}
        </div>
    );
};

export default Profile;
