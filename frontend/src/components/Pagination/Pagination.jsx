import React from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesLeft,
    faAngleLeft,
    faAngleRight,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ pagination }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = pagination.currentPage;
    const noPages = pagination.noPages;

    const range = 2;
    let firstPage = Math.max(1, currentPage - range);
    let lastPage = Math.min(currentPage + range, noPages);

    if (lastPage - firstPage < 4 && noPages > 4) {
        if (firstPage === 1) {
            lastPage = Math.min(noPages, firstPage + 4);
        } else if (lastPage === noPages) {
            firstPage = Math.max(1, lastPage - 4);
        }
    }

    const pageNumbers = [];
    for (let i = firstPage; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= noPages) {
            searchParams.set("page", newPage);
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="flex items-center justify-center my-8 space-x-2">
            <button
                key="first"
                onClick={() => handlePageChange(1)}
                className={`flex items-center justify-center h-10 w-10 p-2 rounded-lg ${
                    currentPage === 1 ? "text-gray-400" : "hover:bg-black hover:cursor-pointer"
                }`}
                disabled={currentPage === 1}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                className={`flex items-center justify-center h-10 w-10 p-2 rounded-lg ${
                    currentPage === 1 ? "text-gray-400" : "hover:bg-black hover:cursor-pointer"
                }`}
                disabled={currentPage === 1}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={`page-${number}`}
                    onClick={() => handlePageChange(number)}
                    className={`flex items-center justify-center h-10 w-10 p-2 rounded-lg ${
                        currentPage === number
                            ? "bg-black text-white"
                            : "hover:bg-black hover:cursor-pointer"
                    }`}
                >
                    {number}
                </button>
            ))}
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                className={`flex items-center justify-center h-10 w-10 p-2 rounded-lg ${
                    currentPage === noPages
                        ? "text-gray-400"
                        : "hover:bg-black hover:cursor-pointer"
                }`}
                disabled={currentPage === noPages}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
                key="last"
                onClick={() => handlePageChange(noPages)}
                className={`flex items-center justify-center h-10 w-10 p-2 rounded-lg ${
                    currentPage === noPages
                        ? "text-gray-400"
                        : "hover:bg-black hover:cursor-pointer"
                }`}
                disabled={currentPage === noPages}
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        </div>
    );
};

export default Pagination;
