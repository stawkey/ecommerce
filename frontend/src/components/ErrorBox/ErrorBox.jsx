import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

const ErrorBox = ({ error, setError }) => {
    return (
        <div className="fixed top-0 left-0 right-0 mx-auto w-fit mt-20 max-w-150  z-1000 bg-[#efe0dc] border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center shadow-lg">
            <FontAwesomeIcon icon={faCircleInfo} className="mr-4" />
            <span>{error}</span>
            <button
                onClick={() => setError(null)}
                className="hover:text-red-900 hover:cursor-pointer pl-4 ml-auto text-red-700"
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

export default ErrorBox;
