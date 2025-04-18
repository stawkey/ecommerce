import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    const currentYear = new Date();
    return (
        <footer className="bg-[#121314] py-4 mt-auto">
            <div className="container mx-auto text-center">
                <div className="flex items-center justify-center">
                    <h2 className="md:text-base text-sm font-medium">
                        Copyright <FontAwesomeIcon icon={faCopyright} className="mx-1" /> Leyndell{" "}
                        {currentYear.getFullYear()}{" "}
                    </h2>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
